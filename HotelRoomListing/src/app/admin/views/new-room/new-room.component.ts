import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent {
  roomForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder,
    private roomsService: RoomsService) {
    this.roomForm = this.formBuilder.group({
      room_number: ['', Validators.required],
      room_type: ['', Validators.required],
      availability: ['', Validators.required],
      price: ['', Validators.required],
      room_image: [null, [Validators.required, this.validateImageFile]]
    });
  }

  ngOnInit(){
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  submitForm() {
    if (this.roomForm.valid && this.selectedFile) {
      const roomData = this.roomForm.value;
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
          this.roomForm.reset();
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
      this.roomForm.markAllAsTouched();
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

}


