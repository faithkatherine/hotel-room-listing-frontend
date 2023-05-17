import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Rooms } from 'src/app/interfaces/rooms';
import { RoomsService } from 'src/app/services/rooms.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  roomsData: (Rooms & { showDropdown: boolean })[] = [];
  showNewRoomForm: boolean = false;
  updateRoomForm: FormGroup;
  showUpdateForm = false;
  selectedFile: File | null = null;

  constructor(private roomsService: RoomsService,
    private formBuilder: FormBuilder,
    private modalService: MdbModalService) {
    this.updateRoomForm = this.formBuilder.group({
      room_number: ['', Validators.required],
      room_type: ['', Validators.required],
      price: ['', Validators.required],
      slug: ['']})}

  ngOnInit() {
    this.getRoomsData();
  }

  getRoomsData() {
    this.roomsService.get_rooms().subscribe(response => {
      this.roomsData = response.data.map(room => ({ ...room, showDropdown: false }));
    });
  }

  toggleDropdown(room: Rooms & { showDropdown: boolean }) {
    room.showDropdown = !room.showDropdown;
  }

  updateRoom(event: Event,room: Rooms) {
    this.showUpdateForm = true;
    console.log(this.showUpdateForm)
    this.updateRoomForm.patchValue({
      room_number: room.room_number,
      room_type: room.room_type,
      price: room.price,
      slug: room.slug
    });
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  submitUpdateForm() {
    if (this.updateRoomForm.valid && this.selectedFile) {
      const roomData = this.updateRoomForm.value;
      const formData = new FormData();
      formData.append('room_number', roomData.room_number);
      formData.append('room_type', roomData.room_type);
      formData.append('availability', roomData.availability);
      formData.append('price', roomData.price);
      formData.append('room_image', this.selectedFile);

      this.roomsService.addRoom(formData).subscribe(
        response => {
          // Handle the response from the API
          console.log(response);
          // Reset the form and selected file
          this.updateRoomForm.reset();
          this.selectedFile = null;
        },
        error => {
          // Handle the error response from the API
          console.error(error);
          // Perform error handling or show error message
        }
      );
    } else {
      // Mark form controls as touched to display validation errors
      this.updateRoomForm.markAllAsTouched();
    }
  }



  validateImageFile(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file && file instanceof File) {
      const fileNameParts = file.name.split('.');
      const fileExtension = fileNameParts.length > 1 ? fileNameParts.pop()?.toLowerCase() : '';
      const allowedExtensions = ['jpg', 'jpeg', 'png'];

      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        return { invalidExtension: true };
      }
    }
    return null;
  }


  deleteRoom(event: Event,room: Rooms) {
    // Implement delete logic here
  }


}
