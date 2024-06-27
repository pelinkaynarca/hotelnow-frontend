import { Component, EventEmitter, Output } from '@angular/core';
import { CityService } from 'src/app/services/common/models/city.service';
import { ListCity } from 'src/app/shared/models/cities/list-city';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.scss']
})
export class ListCityComponent {

  listCities: ListCity[] = [];
  @Output() citySelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    try {
      this.listCities = await this.cityService.getAll() as ListCity[];
    } catch (error) {
      console.error('Eror fetching cities', error);
    }
  }

  onSelectCity(event:Event): void {
    const selectedCityId = (event.target as HTMLSelectElement).value;
    if (selectedCityId){
      this.citySelected.emit(+selectedCityId);
    }
  }
  
}
