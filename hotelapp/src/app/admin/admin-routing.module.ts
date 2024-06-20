import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomTypeComponent } from './components/room-types/add-room-type/add-room-type.component';
import { ListRoomTypeComponent } from './components/room-types/list-room-type/list-room-type.component';
import { UpdateRoomTypeComponent } from './components/room-types/update-room-type/update-room-type.component';

const routes: Routes = [
  {path: "room-types", component:ListRoomTypeComponent},
  {path: "room-types/create", component:AddRoomTypeComponent},
  {path: "room-types/Edit/:id", component:UpdateRoomTypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 

}
