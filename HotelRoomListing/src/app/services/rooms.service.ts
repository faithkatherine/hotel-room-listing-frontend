import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private httpClient:HttpClient) { }
  api_url = 'https://stargetaway.uc.r.appspot.com/api/'

  get_rooms(){
    return this.httpClient.get(this.api_url + `rooms/`)
  }
}
