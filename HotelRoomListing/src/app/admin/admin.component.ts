import { Component, Input } from '@angular/core';
import { Rooms } from '../interfaces/rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  roomsData: (Rooms & { showDropdown: boolean })[] = [];
  showNewRoomForm: boolean = false;

  constructor(private roomsService: RoomsService) {}

  ngOnInit() {
    this.getRoomsData();
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;
  }

  toggleNewRoomForm() {
    this.showNewRoomForm = !this.showNewRoomForm;
  }


  getRoomsData() {
    this.roomsService.get_rooms().subscribe(response => {
      this.roomsData = response.data.map(room => ({ ...room, showDropdown: false }));
    });
  }

  toggleDropdown(room: Rooms & { showDropdown: boolean }) {
    room.showDropdown = !room.showDropdown;
  }

  updateRoom(room: Rooms) {
    // Implement update logic here
  }

  deleteRoom(room: Rooms) {
    // Implement delete logic here
  }

}
