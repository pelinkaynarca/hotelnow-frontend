import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
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
