import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AdminComponent } from './admin/admin.component';
import { RoomListComponent } from './admin/views/room-list/room-list.component';
import { NewRoomComponent } from './admin/views/new-room/new-room.component';
import { SliderComponent } from './slider/slider.component';
import { HeaderComponent } from './header/header.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse'; // lib


@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    AdminComponent,
    RoomListComponent,
    NewRoomComponent,
    SliderComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MdbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    MdbCollapseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
