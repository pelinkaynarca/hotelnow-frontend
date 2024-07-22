import { Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FacilityDetailSelectionService } from 'src/app/services/common/models/facility-detail-selection.service';
import { MainFacilitySelectionService } from 'src/app/services/common/models/main-facility-selection.service';
import { ListFacilityDetailSelection } from 'src/app/shared/models/facility-detail-selections/list-facility-detail-selection';
import { ListMainFacilitySelection } from 'src/app/shared/models/main-facility-selections/list-main-facility-selection';

@Component({
  selector: 'app-list-facility-detail-selection',
  templateUrl: './list-facility-detail-selection.component.html',
  styleUrls: ['./list-facility-detail-selection.component.scss']
})
export class ListFacilityDetailSelectionComponent implements OnInit {
  @Input() data!: { hotelId: number };
  listDetailSelections: ListFacilityDetailSelection[];
  listMainSelections: ListMainFacilitySelection[];
  constructor(
    private activeModal: NgbActiveModal,
    private selectionService: FacilityDetailSelectionService,
    private mainSelectionService: MainFacilitySelectionService,
  ) { }

  ngOnInit(): void {
    this.getByHotelId();
  }


  getByHotelId() {
    if (this.data && this.data.hotelId) {
      this.mainSelectionService.getByHotelId(this.data.hotelId).then(data =>{
        this.listMainSelections = data as ListMainFacilitySelection[];
      });

      this.selectionService.getByHotelId(this.data.hotelId).then(data =>{
        this.listDetailSelections = data as ListFacilityDetailSelection[];
      });  
    }
  } 

  closeDialog(): void {
    this.activeModal.close();
  }
}