import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit{

  cityId: number | null = null;
  stars: number | null = null;
  capacity: number | null = null;

  constructor(){}

  ngOnInit(): void {
  }
  
  onFiltersApplied(filters: { cityId: number | null; capacity: number | null; stars: number | null }) {
    this.cityId = filters.cityId;
    this.stars = filters.stars;
    this.capacity = filters.capacity;
  }
}
