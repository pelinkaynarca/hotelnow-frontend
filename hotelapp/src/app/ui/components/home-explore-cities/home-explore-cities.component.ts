import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/common/models/city.service';
import { ListCity } from 'src/app/shared/models/cities/list-city';

@Component({
  selector: 'app-home-explore-cities',
  templateUrl: './home-explore-cities.component.html',
  styleUrls: ['./home-explore-cities.component.scss']
})
export class HomeExploreCitiesComponent implements OnInit{
  listCity: ListCity[];
  cityImages: { [key: number]: string } = {
    2: '../../../../assets/img/ui/istanbul.webp',
    3: '../../../../assets/img/ui/antalya3.jpg',
    4: '../../../../assets/img/ui/mugla2.webp',
    5: '../../../../assets/img/ui/izmir3.jpg',
    6: '../../../../assets/img/ui/kapadokya.jpg',
    7: '../../../../assets/img/ui/pamukkale.jpg'
  };

  constructor(private cityService: CityService){}

  ngOnInit(): void {
    this.getCity();
  }

  getCity(){
    this.cityService.getAll().then(cities => {
      this.listCity = cities as ListCity[];
      this.listCity = this.listCity.filter(city => 
        [2, 3, 4, 5, 6, 7].includes(city.id),
        console.log(cities)
      );
    });
  }

  getImageUrl(cityId: number): string {
    return this.cityImages[cityId] || '';
  }
}
