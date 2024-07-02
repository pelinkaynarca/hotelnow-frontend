import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { SharedRoutingModule } from './shared-routing.module';
import { CityComponent } from './components/city/city.component';
import { DistrictComponent } from './components/district/district.component';
import { NeighborhoodComponent } from './components/neighborhood/neighborhood.component';
import { CountryComponent } from './components/country/country.component';



@NgModule({
  declarations: [
    CityComponent,
    DistrictComponent,
    NeighborhoodComponent,
    CountryComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedRoutingModule
  ],
  exports:[
    CityComponent,
    DistrictComponent,
    NeighborhoodComponent,
    CountryComponent,
  ]
})
export class SharedModule { }
