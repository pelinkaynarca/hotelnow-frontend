import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateRoomTypeComponent } from "./update-room-type/update-room-type.component";
import { AddRoomTypeComponent } from "./add-room-type/add-room-type.component";
import { ListRoomTypeComponent } from "./list-room-type/list-room-type.component";

const routes: Routes = [
  {
    path: '',
    component: ListRoomTypeComponent 
  },
  {
    path: 'Edit/:id', 
    component: UpdateRoomTypeComponent 
  },
  {
    path: 'Create',
    component: AddRoomTypeComponent 
  }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RoomTypeRoutingModule { 
  
  }