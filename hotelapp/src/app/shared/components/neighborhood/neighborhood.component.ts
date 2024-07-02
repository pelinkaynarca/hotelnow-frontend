import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NeighborhoodService } from 'src/app/services/common/models/neighborhood.service';
import { ListNeighborhood } from '../../models/neighborhoods/list-neighborhood';

@Component({
  selector: 'app-neighborhood',
  templateUrl: './neighborhood.component.html',
  styleUrls: ['./neighborhood.component.scss']
})
export class NeighborhoodComponent implements OnChanges{
  listNeighborhoods: ListNeighborhood[];
  @Input() districtId: number;
  @Output() neighborhoodSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(private neighborhoodService: NeighborhoodService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['districtId'] && this.districtId !== null) {
      this.getNeighborhoodsByCity(this.districtId);
    }
  }

  async getNeighborhoodsByCity(districtId: number) {
      this.listNeighborhoods = await this.neighborhoodService.getByDistrictId(districtId) as ListNeighborhood[];
  }

  onSelectDistrict(event: Event): void {
    const selectedNeighborhoodId = (event.target as HTMLSelectElement).value;
    if (selectedNeighborhoodId) {
      this.neighborhoodSelected.emit(+selectedNeighborhoodId);
    }
  }
}
