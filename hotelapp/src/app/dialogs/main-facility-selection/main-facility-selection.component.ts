import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { MainFacilitySelectionService } from 'src/app/services/common/models/main-facility-selection.service';
import { ListMainFacilitySelection } from 'src/app/shared/models/main-facility-selections/list-main-facility-selection';
import { ListMainFacilityOption } from 'src/app/shared/models/main-facility-options/list-main-facility-option';
import { MainFacilityOptionService } from 'src/app/services/common/models/main-facility-option.service';
import { AddMainFacilitySelection } from 'src/app/shared/models/main-facility-selections/add-main-facility-selection';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';

@Component({
  selector: 'app-main-facility-selection',
  templateUrl: './main-facility-selection.component.html',
  styleUrls: ['./main-facility-selection.component.scss']
})
export class MainFacilitySelectionComponent implements OnInit {
  @ViewChild("selectionForm", { static: true }) selectionForm!: NgForm;
  facilityOptions: ListMainFacilityOption[] = [];
  facilitySelections: ListMainFacilitySelection[] = [];

  constructor(
    private selectionService: MainFacilitySelectionService,
    private optionService: MainFacilityOptionService,
    private sweetAlertService: SweetAlertService,
    private activeModal: NgbActiveModal
  ) { }

  async ngOnInit() {
    this.facilityOptions = await this.optionService.getAll() as ListMainFacilityOption[];
    this.facilitySelections = await this.selectionService.getByHotelIdForStaff() as ListMainFacilitySelection[];
  }

  async getByHotelIdForStaff() {
    const listDetails = await this.selectionService.getByHotelIdForStaff();
    this.facilitySelections = listDetails as ListMainFacilitySelection[];
    console.log(listDetails);
  }

  isOptionSelected(optionId: number): boolean {
    return this.facilitySelections.some(selection => selection.optionId === optionId && selection.display);
  }

  onCheckboxChange(optionId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.addSelection(optionId);
    } else {
      this.removeSelection(optionId);
    }
  }

  addSelection(optionId: number) {
    const selection = new AddMainFacilitySelection();
    selection.optionId = optionId;

    this.selectionService.create(selection, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSucces)
    });

    this.facilitySelections.push({ id: 0, optionId, optionTitle: '', display: true });
  }

  removeSelection(optionId: number) {
    const selection = this.facilitySelections.find(s => s.optionId === optionId);
    if (selection) {
      this.selectionService.delete(selection.id).then(() => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces)
      }
      );
      /*
            const index = this.facilitySelections.indexOf(selection);
            if (index !== -1) {
              this.facilitySelections.splice(index, 1);
    }; */
    }
  }

  close() {
    this.activeModal.close();
  }
}