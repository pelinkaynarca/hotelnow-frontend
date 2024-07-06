import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  selectedStars: number | null = null;
  selectedCityId: number | null = null;
  selectedCapacity: number | null = null;

  @Output() filtersApplied = new EventEmitter<{ cityId: number | null; capacity: number | null; stars: number | null }>();

  constructor(private router: Router){}
  setStars(stars: number) {
    this.selectedStars = stars;
  }

  onCitySelected(cityId: number) {
    this.selectedCityId = cityId;
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
