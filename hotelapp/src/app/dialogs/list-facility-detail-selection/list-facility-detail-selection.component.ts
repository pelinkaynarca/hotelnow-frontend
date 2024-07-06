import { Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityCategoryService } from 'src/app/services/common/models/facility-category.service';
import { FacilityDetailSelectionService } from 'src/app/services/common/models/facility-detail-selection.service';
import { ListFacilityCategory } from 'src/app/shared/models/facility-categories/list-facility-category';
import { FacilityDetailSelection } from 'src/app/shared/models/facility-detail-selections/facility-detail-selection';
import { ListFacilityDetailSelection } from 'src/app/shared/models/facility-detail-selections/list-facility-detail-selection';

@Component({
  selector: 'app-list-facility-detail-selection',
  templateUrl: './list-facility-detail-selection.component.html',
  styleUrls: ['./list-facility-detail-selection.component.scss']
})
export class ListFacilityDetailSelectionComponent implements OnInit {
@Input() data!: { hotelId: number };
  hotelId!: number;
  facilityDetailSelections: FacilityDetailSelection[] = [];
  facilityCategories: ListFacilityCategory[];
  categorizedSelections: ListFacilityDetailSelection[] = [];

  constructor(public activeModal: NgbActiveModal,
    private selectionService: FacilityDetailSelectionService,
    private facilityCategoryService: FacilityCategoryService
  ) { }

  ngOnInit(): void {
    this.getAllOptions();
    this.getByHotelId(this.data.hotelId);
  }

  async getAllOptions() {
    const data = await this.facilityCategoryService.getAll() as ListFacilityCategory[];
    this.facilityCategories = data;
  }

  async getByHotelId(hotelId: number) {
    if (this.data && this.data.hotelId) {
      this.hotelId = this.data.hotelId;
      const listDetails = await this.selectionService.getByHotelId(this.data.hotelId) as ListFacilityDetailSelection[];
      this.facilityDetailSelections = listDetails.flatMap(detail => detail.facilityDetailSelection);
      
    }
  } 

  isSelected(description: string): boolean {
    return this.facilityDetailSelections.some(selection => selection.optionDescription === description);
  }
  
  hasSelectedOptions(category: ListFacilityCategory): boolean {
    return category.facilityDetailOptionResponse.some(option =>
      this.facilityDetailSelections.some(selection => selection.optionDescription === option.description)
    );
  }

  closeDialog(): void {
    this.activeModal.close();
  }
}