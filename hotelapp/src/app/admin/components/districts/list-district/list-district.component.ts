import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { DistrictService } from 'src/app/services/common/models/district.service'
import { ListDistrict } from 'src/app/shared/models/districts/list-district';


@Component({
  selector: 'app-list-district',
  templateUrl: './list-district.component.html',
  styleUrls: ['./list-district.component.scss']
})
export class ListDistrictComponent implements OnInit {

  listDistricts: ListDistrict[] = [];
  @Output() districtSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(private districtService: DistrictService) {}

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    try {
      this.listDistricts = await this.districtService.getAll() as ListDistrict[];
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  }

  onSelectDistrict(event: Event): void {
    const selectedDistrictId = (event.target as HTMLSelectElement).value;
    if (selectedDistrictId) {
      this.districtSelected.emit(+selectedDistrictId);
    }
  }
}