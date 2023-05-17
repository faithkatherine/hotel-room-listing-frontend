import { Component } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Rooms } from '../interfaces/rooms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  roomsData!:Rooms[];
  roomImageUrl!: SafeUrl;

  constructor(private roomsService: RoomsService,
    private sanitizer:DomSanitizer){}

  ngOnInit(){
    this.getRoomsData();

  }
  getRoomsData(){
    this.roomsService.get_rooms().subscribe(response =>{
      this.roomsData = response.data

    });
  }


}
