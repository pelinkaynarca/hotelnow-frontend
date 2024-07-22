import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';

@Component({
  selector: 'app-room-type-detail',
  templateUrl: './room-type-detail.component.html',
  styleUrls: ['./room-type-detail.component.scss']
})
export class RoomTypeDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;
  listRoomType: ListRoomType;
  @Input() data!: { roomTypeId: number };
  currentSlide: number = 0;
  dotHelper: Array<Number> = [];
  slider: KeenSliderInstance | null = null; 
  
  constructor(
    private roomTypeService: RoomTypeService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.getByRoomTypeId();
  }

  async getByRoomTypeId() {
    if (this.data && this.data.roomTypeId) {
    await this.roomTypeService.getById(this.data.roomTypeId).then(data => {
      this.listRoomType = data as ListRoomType;
    })
  }
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
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

  close() {
    this.activeModal.close();
  }
}
