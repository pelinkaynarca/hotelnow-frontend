import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { NeighborhoodService } from 'src/app/services/common/models/neighborhood.service';
import { ListNeighborhood } from 'src/app/shared/models/neighborhoods/list-neighborhood';

@Component({
  selector: 'app-list-neighborhood',
  templateUrl: './list-neighborhood.component.html',
  styleUrls: ['./list-neighborhood.component.scss']
})
export class ListNeighborhoodComponent implements OnInit {

  @Input() districtId: number | null = null;
  listNeighborhoods: ListNeighborhood[] = [];

  constructor(
    private neighborhoodService: NeighborhoodService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    if (this.districtId !== null) {
      this.getNeighborhoodsByDistrictId(this.districtId);
    } else {
      this.getAllNeighborhoods();
    }
  }

  async getAllNeighborhoods() {
    try {
      const neighborhoods = await this.neighborhoodService.getAll();
      if (typeof neighborhoods === 'string') {
        console.error('Error fetching neighborhoods:', neighborhoods);
        await this.sweetAlertService.showAlert(SweetStatus.serverError);
      } else {
        this.listNeighborhoods = neighborhoods;
      }
    } catch (error) {
      console.error('Error fetching neighborhoods:', error);
      await this.sweetAlertService.showAlert(SweetStatus.serverError);
    }
  }

  async getNeighborhoodsByDistrictId(districtId: number) {
    try {
      const neighborhoods = await this.neighborhoodService.getByDistrictId(districtId);
      if (typeof neighborhoods === 'string') {
        console.error('Error fetching neighborhoods by district:', neighborhoods);
        await this.sweetAlertService.showAlert(SweetStatus.serverError);
      } else {
        this.listNeighborhoods = neighborhoods;
      }
    } catch (error) {
      console.error('Error fetching neighborhoods by district:', error);
      await this.sweetAlertService.showAlert(SweetStatus.serverError);
    }
  }

}
