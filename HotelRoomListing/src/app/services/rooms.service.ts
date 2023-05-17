import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomResponse, Rooms } from '../interfaces/rooms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private httpClient:HttpClient) { }
  api_url = 'https://stargetaway.uc.r.appspot.com/api/'

  get_rooms(){
    return this.httpClient.get<RoomResponse>(this.api_url + `rooms/`)
  }

  addRoom(roomData: any): Observable<any> {
    return this.httpClient.post<any>(this.api_url +  `createRoom/`, roomData);
  }
}
