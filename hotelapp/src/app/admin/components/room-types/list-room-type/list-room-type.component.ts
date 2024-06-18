import { Component, OnInit } from '@angular/core';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';

@Component({
  selector: 'app-list-room-type',
  templateUrl: './list-room-type.component.html',
  styleUrls: ['./list-room-type.component.scss']
})
export class ListRoomTypeComponent implements OnInit {
  listRoomTypes: ListRoomType[] = [];
  constructor(private roomTypeService: RoomTypeService, private sweetAlertService: SweetAlertService){}

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(){
    return this.roomTypeService.getAll().then(roomTypeData =>{
      this.listRoomTypes = roomTypeData as ListRoomType[];
    })
  }

  async delete(id:number){
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if(sweetAlertResult.isConfirmed){
      this.roomTypeService.delete(id, ()=>{
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
      error => {
        this.sweetAlertService.showAlert(SweetStatus.serverError);
     })
      .then(() => {
        this.getAll();
      });
    }
  }
}
