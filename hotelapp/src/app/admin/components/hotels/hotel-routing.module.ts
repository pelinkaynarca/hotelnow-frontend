import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateHotelComponent } from "./update-hotel/update-hotel.component";
import { ListHotelComponent } from "./list-hotel/list-hotel.component";

const routes: Routes = [
  {
    path: '',
    component: ListHotelComponent 
  },
  {
    path: 'edit', 
    component: UpdateHotelComponent 
  }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HotelRoutingModule { 
  
  }