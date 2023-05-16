import { Component } from '@angular/core';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {

  constructor(private roomsService: RoomsService){}

  ngOnInit(){
    this.getRoomsData();

  }
  getRoomsData(){
    this.roomsService.get_rooms().subscribe(data =>{
      console.log(data);
    });
  }
}
