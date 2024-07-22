import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListHotel } from 'src/app/shared/models/hotels/list-hotel';
import { HotelService } from 'src/app/services/common/models/hotel.service'
import { DialogService } from 'src/app/services/common/dialog.service';
import { ListFacilityDetailSelectionComponent } from 'src/app/dialogs/list-facility-detail-selection/list-facility-detail-selection.component';
import KeenSlider,{ KeenSliderInstance } from 'keen-slider';


@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})
export class HotelInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;
  @Input() hotel: ListHotel;
  currentSlide: number = 0;
  dotHelper: Array<Number> = [];
  slider: KeenSliderInstance | null = null; 

  constructor(
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        },
      })
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ]
    }, 200)
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

  fetchHotelById(hotelId: number) {
    this.hotelService.getById(hotelId).then(data => {
      this.hotel = data as ListHotel;
    });
  }

  showFacilityDetailSelections(hotelId: number): void {
    this.dialogService.openDialog({
      componentType: ListFacilityDetailSelectionComponent,
      data: { hotelId }
    });
  }

  createRange(number: number): number[] {
    return Array.from({ length: number }, (_, i) => i);
  }
}
