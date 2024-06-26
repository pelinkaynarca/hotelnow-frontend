import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { FacilityDetailSelectionService } from 'src/app/services/common/models/facility-detail-selection.service';
import { FacilityDetailSelection } from 'src/app/shared/models/facility-detail-selections/facility-detail-selection';
import { ListFacilityDetailSelection } from 'src/app/shared/models/facility-detail-selections/list-facility-detail-selection';

@Component({
  selector: 'app-facility-detail-selection',
  templateUrl: './facility-detail-selection.component.html',
  styleUrls: ['./facility-detail-selection.component.scss']
})
export class FacilityDetailSelectionComponent implements OnInit{
  @ViewChild("selectionForm", { static: true }) selectionForm!: NgForm;
  @Input() data!: { roomTypeId: number };
  facilityDetailSelections: FacilityDetailSelection[];

  constructor(private selectionService: FacilityDetailSelectionService,
    private sweetAlertService: SweetAlertService,
    private activeModal: NgbActiveModal,
  ){}

  ngOnInit(): void {
    
  }

  async getAllOptions() {
   
  }

  async getByHotelId() {
    if (this.data && this.data.roomTypeId) {
      const listDetails = await this.selectionService.getByHotelId(this.data.roomTypeId) as ListFacilityDetailSelection[];
      this.facilityDetailSelections = listDetails.flatMap(detail => detail.facilityDetailSelection);
    }
  }

  onSubmit(){

  }

  onCheckboxChange(option:any) {
    if (!option.display) {
     
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
