import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeDetailSelectionService } from 'src/app/services/common/models/room-type-detail-selection.service';
import { RoomTypeFacilityCategoryService } from 'src/app/services/common/models/room-type-facility-category.service';
import { AddRoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selection/add-room-type-detail-selection';
import { ListRoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selection/list-room-type-detail-selection';
import { RoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selection/room-type-detail-selection';
import { ListRoomTypeFacilityCategory } from 'src/app/shared/models/room-type-facility-categories/list-room-type-facility-categories';

@Component({
  selector: 'app-room-type-facility-detail-selection',
  templateUrl: './room-type-facility-detail-selection.component.html',
  styleUrls: ['./room-type-facility-detail-selection.component.scss']
})
export class RoomTypeFacilityDetailSelectionComponent implements OnInit {
  @ViewChild("selectionForm", { static: true }) selectionForm!: NgForm;
  @Input() data!: { roomTypeId: number };
  roomTypeId!: number;
  listCategories: ListRoomTypeFacilityCategory[] = [];
  roomTypeSelections: RoomTypeDetailSelection[] = [];

  constructor(
    private selectionService: RoomTypeDetailSelectionService,
    private sweetAlertService: SweetAlertService,
    private activeModal: NgbActiveModal,
    private categoryService: RoomTypeFacilityCategoryService) { }

  ngOnInit(): void {
    this.getAllOptions();
    this.getRoomTypeId();
  }

  async getRoomTypeId() {
    if (this.data && this.data.roomTypeId) {
      this.roomTypeId = this.data.roomTypeId;
      const listDetails = await this.selectionService.getByRoomTypeId(this.data.roomTypeId) as ListRoomTypeDetailSelection[];
      this.roomTypeSelections = listDetails.flatMap(detail => detail.roomTypeFacilityDetailSelectionResponses);
    }
  }

  async getAllOptions() {
    const data = await this.categoryService.getAll() as ListRoomTypeFacilityCategory[];
    this.listCategories = data;
  }

  async onSubmit() {
    const addOrUpdateSelections: AddRoomTypeDetailSelection[] = [];
    this.listCategories.forEach(category => {
      category.roomTypeFacilityOptionResponse.forEach(option => {
        if (option.display) {
          addOrUpdateSelections.push({
            roomTypeId: this.roomTypeId,
            optionId: option.id,
            display: option.display
          });
        }
      });
    });
    
    await this.selectionService.create(addOrUpdateSelections, async () => {
      await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
    }, error => {
      // Handle error
    });
  }

  onSelectAllOptions(category: ListRoomTypeFacilityCategory, isChecked: boolean) {
    category.roomTypeFacilityOptionResponse.forEach(option => {
      option.display = isChecked;
    });
  }

  isSelected(description: string): boolean {
    return this.roomTypeSelections.some(selection => selection.optionDescription === description);
  }

  close() {
    this.activeModal.close();
  }
}
