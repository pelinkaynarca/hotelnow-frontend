import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeDetailSelectionService } from 'src/app/services/common/models/room-type-detail-selection.service';
import { ListRoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selection/list-room-type-detail-selection';

@Component({
  selector: 'app-room-type-facility-detail-selection',
  templateUrl: './room-type-facility-detail-selection.component.html',
  styleUrls: ['./room-type-facility-detail-selection.component.scss']
})
export class RoomTypeFacilityDetailSelectionComponent implements OnInit {
  @Input() data!: { roomTypeId: number };
  roomTypeId!: number;
  listDetails: ListRoomTypeDetailSelection[];

  constructor(
    private roomTypeDetailSelection: RoomTypeDetailSelectionService,
    private sweetAlertService: SweetAlertService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    if (this.data && this.data.roomTypeId) {
      this.roomTypeId = this.data.roomTypeId;
      
      this.roomTypeDetailSelection.getByRoomTypeId(this.data.roomTypeId).then( detailsData=>{
        this.listDetails = detailsData as ListRoomTypeDetailSelection[];
        console.log(this.listDetails);
      })
    }
  }

  close() {
    this.activeModal.close();
  }
}
