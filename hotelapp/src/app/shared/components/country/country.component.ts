import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {
  listCountries: any[] = [];
  @Output() countrySelected: EventEmitter<number> = new EventEmitter<number>();

  // constructor(private countryService: CountryService) { }

  // ngOnInit(): void {
  //   this.getAll();
  // }

  // async getAll() {
  //   this.listCities = await this.countryService.getAll() as ListCountry[];
  // }

  onSelectCountry(event: Event): void {
    const selectedcountryId = (event.target as HTMLSelectElement).value;
    if (selectedcountryId) {
      this.countrySelected.emit(+selectedcountryId);
    }
  }
}
