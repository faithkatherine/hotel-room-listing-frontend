import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Rooms } from 'src/app/interfaces/rooms';
import { RoomsService } from 'src/app/services/rooms.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  showNewRoomForm: boolean = false;
  showUpdateForm = false;
  updateForm: FormGroup;

  electedFile: File | null = null;
  roomsData: (Rooms & { showDropdown: boolean; showUpdateForm: boolean; updateForm: FormGroup })[] = [];

  selectedFile: File | null = null;

  constructor(private roomsService: RoomsService,
    private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      room_number: ['', Validators.required],
      room_type: ['', Validators.required],
      price: ['', Validators.required],
      availability: ['', Validators.required],
      room_image: ['']
    })}

  ngOnInit() {
    this.getRoomsData();
  }

  getRoomsData() {
    this.roomsService.get_rooms().subscribe(response => {
      this.roomsData = response.data.map(room => ({
        ...room,
        showDropdown: false,
        showUpdateForm: false,
        updateForm: this.formBuilder.group({
          room_number: [room.room_number, Validators.required],
          room_type: [room.room_type, Validators.required],
          availability: [room.availability],
          price: [room.price, Validators.required],
          room_image: ['']

        })
      }));
    });
  }

  toggleDropdown(room: Rooms & { showDropdown: boolean }) {
    room.showDropdown = !room.showDropdown;
  }

  updateRoom(event: Event, room: Rooms & { showUpdateForm: boolean }) {
    room.showUpdateForm = !room.showUpdateForm;
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  submitUpdateForm(room: any & { showUpdateForm: boolean }, slug:string) {
    console.log("Clicked");
    if (room.updateForm.valid) {
      const roomData = room.updateForm.value;
      console.log(roomData);
      const formData = new FormData();
      formData.append('room_number', roomData.room_number);
      formData.append('room_type', roomData.room_type);
      formData.append('availability', roomData.availability);
      formData.append('price', roomData.price);
      if (this.selectedFile) {
        formData.append('room_image', this.selectedFile);
      }

      console.log(formData)

      this.roomsService.updateRoom(formData, slug).subscribe(
        response => {
          console.log(response);
          this.updateForm.reset();
          this.selectedFile = null;
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.updateForm.markAllAsTouched();
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


  deleteRoom(event: Event,slug:string) {
    this.roomsService.deleteRoom(slug).subscribe(response =>{
      console.log(response);
    },
    error => {
      console.error(error);
    });
  }


}
