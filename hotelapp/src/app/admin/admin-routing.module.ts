import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomTypeComponent } from './components/room-types/add-room-type/add-room-type.component';
import { RoomTypeImageComponent } from './components/room-type-image/room-type-image.component';

const routes: Routes = [
  {path: "add-room-type", component:AddRoomTypeComponent},
  {path: "list-image/:id", component:RoomTypeImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 

}
