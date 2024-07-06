import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/common/models/city.service';
import { ListCity } from 'src/app/shared/models/cities/list-city';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.scss']
})
export class HomeFilterComponent implements OnInit{
  selectedStars: number | null = null;
  selectedCityId: number | null = null;
  selectedCapacity: number | null = null;
  listCities: ListCity[];
  @Output() filtersApplied = new EventEmitter<{ cityId: number | null; capacity: number | null; stars: number | null }>();

  constructor(private router: Router, private cityService: CityService){}
  setStars(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedStars = target.value !== '0' ? parseInt(target.value, 10) : null;
  }

  ngOnInit(): void {
    this.getCities();
  }
  async getCities(){
    const city = await this.cityService.getAll();
    this.listCities = city as ListCity[];
  }

  setCity(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCityId = target.value !== '0' ? parseInt(target.value, 10) : null;
  }

  setCapacity(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCapacity = target.value !== '0' ? parseInt(target.value, 10) : null;
  }

  applyFilters() {
    this.filtersApplied.emit({
      cityId: this.selectedCityId,
      capacity: this.selectedCapacity,
      stars: this.selectedStars
    });
    this.updateURL();
  }

  updateURL() {
    this.router.navigate(['/search'], {
      queryParams: {
        cityId: this.selectedCityId || undefined,
        capacity: this.selectedCapacity || undefined,
        stars: this.selectedStars || undefined
      },
      queryParamsHandling: 'merge'
    });
  }
}
