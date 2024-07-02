import { Component } from '@angular/core';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent {
  selectedCityId: number | null = null;
  selectedDistrictId: number | null = null;
  selectedNeighborhoodId: number | null = null;
  
  constructor(){}

  onCitySelected(cityId: number) {
    this.selectedCityId = cityId;
  }

  onDistrictSelected(districtId: number) {
    this.selectedDistrictId = districtId;
  }

  onNeighborhoodSelected(neighborhoodId:number){
    this.selectedNeighborhoodId = neighborhoodId;
  }
}
