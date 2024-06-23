import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeFacilityCategoryService } from 'src/app/services/common/models/room-type-facility-category.service';
import { RoomTypeFacilitySelectionService } from 'src/app/services/common/models/room-type-facility-selection.service';
import { ListRoomTypeFacilityCategory } from 'src/app/shared/models/room-type-facility-categories/list-room-type-facility-category';
import { RoomTypeFacilityCategory } from 'src/app/shared/models/room-type-facility-categories/room-type-facility-category';
import { AddRoomTypeFacilitySelection } from 'src/app/shared/models/room-type-facility-selection/add-room-type-facility-selection';
import { ListRoomTypeFacilitySelection } from 'src/app/shared/models/room-type-facility-selection/list-room-type-facility-selection';
import { RoomTypeFacilitySelection } from 'src/app/shared/models/room-type-facility-selection/room-type-facility-selection';

@Component({
  selector: 'app-room-type-facility-selection',
  templateUrl: './room-type-facility-selection.component.html',
  styleUrls: ['./room-type-facility-selection.component.scss']
})

export class RoomTypeFacilitySelectionComponent implements OnInit {

  @ViewChild("selectionForm", { static: true }) selectionForm: NgForm;
  @Input() data!: { roomTypeId: number };
  roomTypeId!: number;
  listCategories: ListRoomTypeFacilityCategory[] = [];
  roomTypeSelections: RoomTypeFacilitySelection[] = [];

  constructor(
    private selectionService: RoomTypeFacilitySelectionService,
    private categoryService: RoomTypeFacilityCategoryService,
    private activeModal: NgbActiveModal,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getAllOptions();
    this.getRoomTypeId();
  }

  async getRoomTypeId() {
    if (this.data && this.data.roomTypeId) {
      this.roomTypeId = this.data.roomTypeId;
      const listDetails = await this.selectionService.getByRoomTypeId(this.roomTypeId) as ListRoomTypeFacilitySelection[];
      this.roomTypeSelections = listDetails.flatMap(detail => detail.roomTypeMainFacilitySelectionResponses);
    }
  }

  async getAllOptions() {
    const data = await this.categoryService.getAll() as ListRoomTypeFacilityCategory[];
    this.listCategories = data
  }

  async onSubmit() {
    const addOrUpdateSelections: AddRoomTypeFacilitySelection[] = [];
    this.listCategories.forEach(category => {
      category.roomTypeMainFacilityOption.forEach(option => {
        if (option.display) {
          addOrUpdateSelections.push({
            roomTypeId: this.data.roomTypeId,
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
  onCheckbox(option: RoomTypeFacilityCategory) {
    if (!option.display) {
      const selectedOption = this.listCategories
        .flatMap(category => category.roomTypeMainFacilityOption)
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

  onCheckboxChange(selectedOption: any, category: ListRoomTypeFacilityCategory) {
    category.roomTypeMainFacilityOption.forEach(option => {
      option.display = (option === selectedOption);
    });

    this.roomTypeSelections.forEach(selection => {
      if (selection.optionDescription !== selectedOption.description) {
        this.selectionService.delete(selection.id);
      }
    });
  }
  
  isSelected(description: string): boolean {
    return this.roomTypeSelections.some(selection => selection.optionDescription === description);
  }

  close() {
    this.activeModal.close();
  }
}
