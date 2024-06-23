import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeDetailSelectionService } from 'src/app/services/common/models/room-type-detail-selection.service';
import { RoomTypeDetailCategoryService } from 'src/app/services/common/models/room-type-detail-category.service';
import { AddRoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selections/add-room-type-detail-selection';
import { ListRoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selections/list-room-type-detail-selection';
import { RoomTypeDetailSelection } from 'src/app/shared/models/room-type-detail-selections/room-type-detail-selection';
import { ListRoomTypeDetailCategory } from 'src/app/shared/models/room-type-detail-categories/list-room-type-detail-category';
import { RoomTypeDetailCategory } from 'src/app/shared/models/room-type-detail-categories/room-type-detail-category';

@Component({
  selector: 'app-room-type-facility-detail-selection',
  templateUrl: './room-type-facility-detail-selection.component.html',
  styleUrls: ['./room-type-facility-detail-selection.component.scss']
})
export class RoomTypeFacilityDetailSelectionComponent implements OnInit {
  @ViewChild("selectionForm", { static: true }) selectionForm!: NgForm;
  @Input() data!: { roomTypeId: number };
  roomTypeId!: number;
  listCategories: ListRoomTypeDetailCategory[] = [];
  roomTypeSelections: RoomTypeDetailSelection[] = [];

  constructor(
    private selectionService: RoomTypeDetailSelectionService,
    private sweetAlertService: SweetAlertService,
    private activeModal: NgbActiveModal,
    private categoryService: RoomTypeDetailCategoryService) { }

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
    const data = await this.categoryService.getAll() as ListRoomTypeDetailCategory[];
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

    });
  }

  onCheckboxChange(option: RoomTypeDetailCategory) {
    if (!option.display) {
      const selectedOption = this.listCategories
        .flatMap(category => category.roomTypeFacilityOptionResponse)
        .find(opt => opt.id === option.id);

      if (selectedOption) {
        selectedOption.display = false;
      }

      const selectionToDelete = this.roomTypeSelections.find(sel => sel.optionDescription === option.description);
      if (selectionToDelete) {
        this.selectionService.delete(selectionToDelete.id);
      }
    }
  }
  
  isSelected(description: string): boolean {
    return this.roomTypeSelections.some(selection => selection.optionDescription === description);
  }
  
  close() {
    this.activeModal.close();
  }
}
