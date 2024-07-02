import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DistrictService } from 'src/app/services/common/models/district.service';
import { ListDistrict } from '../../models/districts/list-district';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnChanges{
  listDistricts: ListDistrict[];
  @Input() cityId: number;
  @Output() districtSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(private districtService: DistrictService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cityId'] && this.cityId !== null) {
      this.getDistrictsByCity(this.cityId);
    }
  }

  async getDistrictsByCity(cityId: number) {
      this.listDistricts = await this.districtService.getByCityId(cityId) as ListDistrict[];
  }

  onSelectDistrict(event: Event): void {
    const selectedDistrictId = (event.target as HTMLSelectElement).value;
    if (selectedDistrictId) {
      this.districtSelected.emit(+selectedDistrictId);
    }
  }
}
