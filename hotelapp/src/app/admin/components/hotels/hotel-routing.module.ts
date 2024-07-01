import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateHotelComponent } from "./update-hotel/update-hotel.component";
import { ListAllHotelsComponent } from "./list-all-hotels/list-all-hotels.component";

const routes: Routes = [
  {
    path: '',
    component: ListAllHotelsComponent
  },
  {
    path: 'edit',
    component: UpdateHotelComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule {

}