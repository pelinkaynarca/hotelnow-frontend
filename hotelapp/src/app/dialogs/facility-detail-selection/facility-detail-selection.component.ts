import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { FacilityCategoryService } from 'src/app/services/common/models/facility-category.service';
import { FacilityDetailSelectionService } from 'src/app/services/common/models/facility-detail-selection.service';
import { AddFacilityCategory } from 'src/app/shared/models/facility-categories/add-facility-category';
import { FacilityCategory } from 'src/app/shared/models/facility-categories/facility-category';
import { ListFacilityCategory } from 'src/app/shared/models/facility-categories/list-facility-category';
import { AddFacilityDetailSelection } from 'src/app/shared/models/facility-detail-selections/add-facility-detail-selection';
import { FacilityDetailSelection } from 'src/app/shared/models/facility-detail-selections/facility-detail-selection';
import { ListFacilityDetailSelection } from 'src/app/shared/models/facility-detail-selections/list-facility-detail-selection';

@Component({
  selector: 'app-facility-detail-selection',
  templateUrl: './facility-detail-selection.component.html',
  styleUrls: ['./facility-detail-selection.component.scss']
})
export class FacilityDetailSelectionComponent implements OnInit {
  @ViewChild("selectionForm", { static: true }) selectionForm!: NgForm;
  @Input() data!: { hotelId: number };
  facilityDetailSelections: FacilityDetailSelection[] = [];
  facilityCategories: ListFacilityCategory[];

  constructor(private selectionService: FacilityDetailSelectionService,
    private sweetAlertService: SweetAlertService,
    private activeModal: NgbActiveModal,
    private facilityCategoryService: FacilityCategoryService
  ) { }

  ngOnInit(): void {
    this.getAllOptions();
    this.getByHotelForStaff();
  }

  async getAllOptions() {
    const data = await this.facilityCategoryService.getAll() as ListFacilityCategory[];
    this.facilityCategories = data;
  }

  async getByHotelForStaff() {
    if (this.data && this.data.hotelId) {
      const listDetails = await this.selectionService.getFacilityDetailSelenctionStaff() as ListFacilityDetailSelection[];
      this.facilityDetailSelections = listDetails.flatMap(detail => detail.facilityDetailSelection);
    }
  }

  async onSubmit() {
    const addOrUpdateSelections: AddFacilityDetailSelection[] = [];
    this.facilityCategories.forEach(category => {
      category.facilityDetailOptionResponse.forEach(option => {
        if (option.display) {
          addOrUpdateSelections.push({
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

  onCheckboxChange(option: FacilityCategory) {
    if (!option.display) {

      const selectedOption = this.facilityCategories
      .flatMap(category => category.facilityDetailOptionResponse)
      .find(opt => opt.id === option.id);

    if (selectedOption) {
      selectedOption.display = false;
    }

      const selectionToDelete = this.facilityDetailSelections.find(sel => sel.optionDescription === option.description);
      if (selectionToDelete) {
        this.selectionService.delete(selectionToDelete.id);
      }
    }
  }

  isSelected(description: string): boolean {
    return this.facilityDetailSelections.some(selection => selection.optionDescription === description);
  }

  close() {
    this.activeModal.close();
  }
}
