import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/common/models/hotel.service'
import { MainFacilitySelectionService } from 'src/app/services/common/models/main-facility-selection.service';
import { ListHotel } from 'src/app/shared/models/hotels/list-hotel';
import { ListMainFacilitySelection } from 'src/app/shared/models/main-facility-selections/list-main-facility-selection';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.scss']
})
export class ListHotelsComponent {
  listHotels: ListHotel[] = [];
  // filteredHotels: ListHotel[] = [];
  // cityFilter: string | null = null;
  // activeFilter: boolean | null = null;

  constructor(
    private router: Router,
    private hotelService: HotelService,
    private selectionService: MainFacilitySelectionService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  //TODO: will be changed after filter structure is created
  async getAll() {
    const hotelData = await this.hotelService.getAll();
    this.listHotels = hotelData as ListHotel[];

    for (const hotel of this.listHotels) {
      hotel.mainFacilitySelection = await this.selectionService.getRandomByHotelId(hotel.id) as ListMainFacilitySelection[];
    }

    /* this.filteredHotels = [...this.listHotels]; */
  }

  /* async filterHotels() {
    const hotelData = await this.hotelService.getHotelsByFilter(this.cityFilter, this.activeFilter);
    this.filteredHotels = hotelData as ListHotel[];
  } */

  createRange(number: number): number[] {
    return Array.from({ length: number }, (_, i) => i);
  }
}