export interface RoomResponse{
  status:string;
  code:number;
  data:Rooms[];
  message:string;
}
export interface Rooms{
  room_number:string;
  room_type:string;
  availability:string;
  price:number;
  room_image:string;
  slug:string;

}
