import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeFacilityOptionService } from 'src/app/services/common/models/room-type-facility-option.service';
import { RoomTypeFacilitySelectionService } from 'src/app/services/common/models/room-type-facility-selection.service';
import { ListRoomTypeFacilityOption } from 'src/app/shared/models/room-type-facility-option/list-room-type-facility-option';
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
  listOptions: ListRoomTypeFacilityOption[] = [];
  roomTypeSelections: RoomTypeFacilitySelection[] = [];

  constructor(
    private selectionService: RoomTypeFacilitySelectionService,
    private optionService: RoomTypeFacilityOptionService,
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
    const data = await this.optionService.getAll() as ListRoomTypeFacilityOption[];
    this.listOptions = data
  }

  async onSubmit() {
    if (!this.selectionForm.valid) {
      return;
    }

    const addOrUpdateSelections: AddRoomTypeFacilitySelection[] = this.listOptions
      .filter(option => option.display)
      .map(option => ({
        roomTypeId: this.roomTypeId,
        optionId: option.id,
        display: option.display
      }));

    await this.selectionService.create(addOrUpdateSelections, async () => {
      await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      this.close();
    }, error => {
    });
  }

  onCheckboxChange(option: ListRoomTypeFacilityOption) {
    if (!option.display) {

      const selectedOption = this.listOptions.find(opt => opt.id === option.id);
      if (selectedOption) {
        selectedOption.display = false;
      }

      const selectionToDelete = this.roomTypeSelections.find(sel => sel.optionTitle === option.title);
      if (selectionToDelete) {
        this.selectionService.delete(selectionToDelete.id);
      }
    }
  }

  isSelected(optionName: string): boolean {
    return this.roomTypeSelections.some(selection => selection.optionTitle === optionName && selection.display);
  }

  close() {
    this.activeModal.close();
  }
}
