import { Component, OnInit } from '@angular/core';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { RoomTypeImageComponent } from 'src/app/dialogs/room-type-image/room-type-image.component';
import { RoomComponent } from 'src/app/dialogs/room/room.component';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';

@Component({
  selector: 'app-list-room-type',
  templateUrl: './list-room-type.component.html',
  styleUrls: ['./list-room-type.component.scss']
})
export class ListRoomTypeComponent implements OnInit {
  listRoomTypes: ListRoomType[] = [];
  constructor(private roomTypeService: RoomTypeService, private sweetAlertService: SweetAlertService, private dialogService:DialogService){}

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
     })
      .then(() => {
        this.getAll();
      });
    }
  }

  async showPhotos(roomTypeId: number) {
    this.dialogService.openDialog({
      componentType: RoomTypeImageComponent,
      data: { roomTypeId },
      options: {
        size: 'lg',
        backdrop: 'static',
        centered: true
      }
    });
  }

  async showRooms(roomTypeId: number) {
    this.dialogService.openDialog({
      componentType: RoomComponent,
      data: { roomTypeId },
      options: {
        size: 'lg',
        backdrop: 'static',
        centered: true
      }
    });
  }
}
