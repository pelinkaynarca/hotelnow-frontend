import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CityService } from 'src/app/services/common/models/city.service';
import { ListCity } from '../../models/cities/list-city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit{
  listCities: ListCity[] = [];
  @Output() citySelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    this.listCities = await this.cityService.getAll() as ListCity[];
  }

  onSelectCity(event: Event): void {
    const selectedCityId = (event.target as HTMLSelectElement).value;
    if (selectedCityId) {
      this.citySelected.emit(+selectedCityId);
    }
  }
}
