import { Component, OnInit } from '@angular/core';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  roomTypes: ListRoomType[];

  constructor(private roomTypeService:RoomTypeService){}

  ngOnInit(): void {
    this.getRoomTypes();
  }

  getRoomTypes(){
    this.roomTypeService.getAll().then(rommTypeData =>{
      this.roomTypes = rommTypeData as ListRoomType[];
    })
  }

}
