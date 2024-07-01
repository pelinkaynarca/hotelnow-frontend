import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HotelService } from 'src/app/services/common/models/hotel.service';
import { ListHotel } from 'src/app/shared/models/hotels/list-hotel';
import { MainFacilitySelectionService } from 'src/app/services/common/models/main-facility-selection.service';
import { ListMainFacilitySelection } from 'src/app/shared/models/main-facility-selections/list-main-facility-selection';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
    hotel: ListHotel;
  
    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private hotelService: HotelService,
      private selectionService: MainFacilitySelectionService
    ) {}
  
    ngOnInit(): void {
      const hotelId = +this.route.snapshot.paramMap.get('id');
      this.getHotelDetails(hotelId);
    }
  
    async getHotelDetails(id: number) {
      this.hotel = await this.hotelService.getById(id) as ListHotel;
      this.hotel.mainFacilitySelection = await this.selectionService.getRandomByHotelId(this.hotel.id) as ListMainFacilitySelection[];
      }

    goBack(): void {
      this.location.back();
    }
    
  }