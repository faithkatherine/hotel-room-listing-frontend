import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AdminComponent } from './admin/admin.component';
import { RoomListComponent } from './admin/views/room-list/room-list.component';
import { NewRoomComponent } from './admin/views/new-room/new-room.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    AdminComponent,
    RoomListComponent,
    NewRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MdbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
