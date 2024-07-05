import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { HotelImageService } from 'src/app/services/common/models/hotel-image.service';
import { HotelService } from 'src/app/services/common/models/hotel.service';
import { MainFacilitySelectionService } from 'src/app/services/common/models/main-facility-selection.service';
import { ListHotel } from 'src/app/shared/models/hotels/list-hotel';
import { ListMainFacilitySelection } from 'src/app/shared/models/main-facility-selections/list-main-facility-selection';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.scss']
})
export class ListHotelsComponent implements OnInit {
  @Input() data: { hotelId: number };
  listHotels: ListHotel[] = [];
  hotelId!: number;

  constructor(
    private router: Router,
    private hotelService: HotelService,
    private imageService: HotelImageService,
    private selectionService: MainFacilitySelectionService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(): Promise<void> {
    const hotelData = await this.hotelService.getAll();
    this.listHotels = hotelData as ListHotel[];

    for (const hotel of this.listHotels) {
      hotel.mainFacilitySelections = await this.selectionService.getRandomByHotelId(hotel.id) as ListMainFacilitySelection[];
    }

    this.listHotels.forEach(hotel => {
      hotel.hotelImages.forEach(image => {
        image.path = environment.photoUrl + image.path;
      });
    });
  }

  createRange(number: number): number[] {
    return Array.from({ length: number }, (_, i) => i);
  }
}
