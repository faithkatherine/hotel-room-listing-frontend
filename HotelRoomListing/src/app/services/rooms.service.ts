import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateRoomData, RoomResponse, Rooms, UpdateRoomData } from '../interfaces/rooms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private httpClient:HttpClient) { }
  api_url = 'https://stargetaway.uc.r.appspot.com/api/'

  get_rooms(): Observable<RoomResponse>{
    return this.httpClient.get<RoomResponse>(this.api_url + `rooms/`)
  }

  addRoom(roomData: FormData): Observable<RoomResponse>{
    return this.httpClient.post<RoomResponse>(this.api_url +  `createRoom/`, roomData);
  }

  updateRoom(roomData:FormData,slug:string):Observable<RoomResponse>{
    return this.httpClient.put<RoomResponse>(this.api_url + `updateRoom/` + slug + `/`, roomData)
  }

  deleteRoom(slug:string):Observable<RoomResponse>{
    return this.httpClient.delete<RoomResponse>(this.api_url + `deleteRoom/` + slug + `/`)
  }
}
