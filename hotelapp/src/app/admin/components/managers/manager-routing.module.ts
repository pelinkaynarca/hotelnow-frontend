import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddManagerComponent } from "./add-manager/add-manager.component";
import { ListManagerComponent } from "./list-manager/list-manager.component";


const routes: Routes = [
  {
    path: 'create',
    component: AddManagerComponent
  },
  {
    path: '',
    component: ListManagerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {

}