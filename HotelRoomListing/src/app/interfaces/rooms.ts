export interface RoomResponse{
  status:string;
  code:number;
  data:Rooms[];
  message:string;
}
export interface Rooms{
  room_number:string;
  room_type:string;
  availability:boolean;
  price:number;
  room_image:string;
  slug:string;
}

export interface CreateRoomData {
  room_number: string;
  room_type: string;
  availability: boolean;
  price: number;
  room_image: File;
}

export interface UpdateRoomData {
  room_number: string;
  room_type: string;
  availability: boolean;
  price: number;
  room_image?: File;
}
