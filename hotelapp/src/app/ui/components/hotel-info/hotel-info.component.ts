import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListHotel } from 'src/app/shared/models/hotels/list-hotel';
import { HotelService } from 'src/app/services/common/models/hotel.service'
import { environment } from 'src/environments/environment';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ListFacilityDetailSelectionComponent } from 'src/app/dialogs/list-facility-detail-selection/list-facility-detail-selection.component';
import { ListFacilityDetailSelection } from 'src/app/shared/models/facility-detail-selections/list-facility-detail-selection';

@Component({
    selector: 'app-hotel-info',
    templateUrl: './hotel-info.component.html',
    styleUrls: ['./hotel-info.component.scss']
  })
export class HotelInfoComponent implements OnInit {
  @Input() hotel: ListHotel;
  facilityDetailSelections: ListFacilityDetailSelection[] = []; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const hotelId = +params['id'];
      this.fetchHotelById(hotelId);
    });
  }

  async fetchHotelById(hotelId: number): Promise<void> {
    try {
      const hotel = await this.hotelService.getById(hotelId);

      if (typeof hotel === 'string') {
        console.error('Error fetching hotel:', hotel);
      } else {
        this.hotel = hotel;
        this.facilityDetailSelections = hotel.facilityDetailSelections; // Assign facilityDetailSelections here
        this.processHotelImages(); 
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
    }
  }

  processHotelImages(): void {
    if (this.hotel && this.hotel.hotelImages) {
      this.hotel.hotelImages.forEach(image => {
        image.path = environment.photoUrl + image.path;
      });
    }
  }

  showFacilityDetailSelections(hotelId: number): void {
    this.dialogService.openDialog({
      componentType: ListFacilityDetailSelectionComponent,
      data: { hotelId, facilityDetailSelections: this.facilityDetailSelections } // Pass facilityDetailSelections
    });
  }

  createRange(number: number): number[] {
    return Array.from({ length: number }, (_, i) => i);
  }
}