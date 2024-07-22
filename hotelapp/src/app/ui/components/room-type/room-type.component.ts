import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RoomTypeDetailComponent } from 'src/app/dialogs/room-type-detail/room-type-detail.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnChanges  {
  listRoomTypes: ListRoomType[];
  @Input() hotelId: number;

  constructor(
    private dialogService: DialogService,
    private roomTypeService: RoomTypeService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hotelId'] && this.hotelId) {
      this.getRoomType(this.hotelId);
    }
  }
  
  getRoomType(hotelId: number) {
    this.roomTypeService.getByHotelId(hotelId).then(data => {
      this.listRoomTypes = data as ListRoomType[];
    });
  }

  showFacilityDetailSelections(roomTypeId: number) {
    this.dialogService.openDialog({
      componentType: RoomTypeDetailComponent,
      data: { roomTypeId }
    });
  }
}
