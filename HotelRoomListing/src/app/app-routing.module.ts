import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { AdminComponent } from './admin/admin.component';
import { RoomListComponent } from './admin/views/room-list/room-list.component';
import { NewRoomComponent } from './admin/views/new-room/new-room.component';

const routes: Routes = [
  { path: '', component:RoomsComponent },
  { path: 'admin', component:AdminComponent,
    children: [
      { path: '', component: RoomListComponent },
      { path: 'addRoom',component: NewRoomComponent},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
