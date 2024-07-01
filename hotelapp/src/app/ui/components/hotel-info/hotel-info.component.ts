import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListHotel } from 'src/app/shared/models/hotels/list-hotel';
import { HotelService } from 'src/app/services/common/models/hotel.service'

@Component({
    selector: 'app-hotel-info',
    templateUrl: './hotel-info.component.html',
    styleUrls: ['./hotel-info.component.scss']
  })
export class HotelInfoComponent {
    @Input() hotel: ListHotel;

    constructor(
      ) { }

      createRange(number: number): number[] {
        return Array.from({ length: number }, (_, i) => i);
      }

}