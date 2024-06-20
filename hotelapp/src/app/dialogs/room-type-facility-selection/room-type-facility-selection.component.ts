import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeFacilitySelectionService } from 'src/app/services/common/models/room-type-facility-selection.service';

@Component({
  selector: 'app-room-type-facility-selection',
  templateUrl: './room-type-facility-selection.component.html',
  styleUrls: ['./room-type-facility-selection.component.scss']
})
export class RoomTypeFacilitySelectionComponent implements OnInit{

  @Input() data!: { roomTypeId: number };
  roomTypeId!: number;
  
  constructor(
    private selectionService: RoomTypeFacilitySelectionService,
    private sweetAlertService: SweetAlertService,
    private activeModal: NgbActiveModal){}

  ngOnInit(): void {
    
  }

  close() {
    this.activeModal.close();
  }
}
