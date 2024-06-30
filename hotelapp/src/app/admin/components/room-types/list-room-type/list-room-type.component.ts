import { Component, OnInit } from '@angular/core';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { RoomTypeFacilityDetailSelectionComponent } from 'src/app/dialogs/room-type-facility-detail-selection/room-type-facility-detail-selection.component';
import { RoomTypeImageComponent } from 'src/app/dialogs/room-type-image/room-type-image.component';
import { RoomComponent } from 'src/app/dialogs/room/room.component';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CurrencyService } from 'src/app/services/common/models/currency.service';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';

@Component({
  selector: 'app-list-room-type',
  templateUrl: './list-room-type.component.html',
  styleUrls: ['./list-room-type.component.scss']
})
export class ListRoomTypeComponent implements OnInit {
  listRoomTypes: ListRoomType[] = [];
  originalRoomTypes: ListRoomType[] = []; 
  selectedCurrency: string = 'TRY';

  constructor(
    private roomTypeService: RoomTypeService,
    private sweetAlertService: SweetAlertService,
    private dialogService: DialogService,
    private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getRoomTypeForStaff();
  }

  async getRoomTypeForStaff() {
    const data = await this.roomTypeService.getRoomTypeForStaff();
    this.listRoomTypes = data as ListRoomType[];
    this.originalRoomTypes = JSON.parse(JSON.stringify(this.listRoomTypes));
    await this.updatePrices();
  }

  async delete(id: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if (sweetAlertResult.isConfirmed) {
      this.roomTypeService.delete(id, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      }).then(() => {
        this.getRoomTypeForStaff();
      });
    }
  }

  displayStatus(display: boolean): string {
    return display ? 'Aktif' : 'Kapalı';
  }

  async showPhotos(roomTypeId: number) {
    this.dialogService.openDialog({
      componentType: RoomTypeImageComponent,
      data: { roomTypeId },
    });
  }

  async showRooms(roomTypeId: number) {
    this.dialogService.openDialog({
      componentType: RoomComponent,
      data: { roomTypeId },
    });
  }

  async showFacilityDetailSelection(roomTypeId: number) {
    this.dialogService.openDialog({
      componentType: RoomTypeFacilityDetailSelectionComponent,
      data: { roomTypeId },

    });
  }

  async updatePrices() {
    for (let i = 0; i < this.listRoomTypes.length; i++) {
      const originalPrice = this.originalRoomTypes[i].pricePerNight;
      this.listRoomTypes[i].pricePerNight = await this.currencyService.convertAmountToCurrency(originalPrice, this.selectedCurrency);
    }
  }

}
