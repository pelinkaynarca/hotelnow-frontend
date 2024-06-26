import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { RoomTypeFacilityDetailSelectionComponent } from 'src/app/dialogs/room-type-facility-detail-selection/room-type-facility-detail-selection.component';
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
  translate: TranslateService;
  hotelId: number;
  constructor(
    private roomTypeService: RoomTypeService, 
    private sweetAlertService: SweetAlertService, 
    private dialogService: DialogService,
    translate: TranslateService,
    private route: ActivatedRoute
  ) {
    this.translate = translate; 
    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang && browserLang.match(/en|tr/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.hotelId = +this.route.snapshot.paramMap.get('hotelId')!;
    this.getByHotelId();
  }

  async getAll() {
      const roomTypeData = await this.roomTypeService.getAll();
      this.listRoomTypes = roomTypeData as ListRoomType[];
    } 

  async getByHotelId(){
    const roomTypeData = await this.roomTypeService.getByHotelId(this.hotelId);
    this.listRoomTypes = roomTypeData as ListRoomType[];
  }

  getDisplayText(displayValue: boolean): string {
    return displayValue ? this.translate.instant('HOME.DISPLAY.ACTIVE') : this.translate.instant('HOME.DISPLAY.INACTIVE');
  }

  async delete(id: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if (sweetAlertResult.isConfirmed) {
      this.roomTypeService.delete(id, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      }).then(() => {
          this.getAll();
        });
    }
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
  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
