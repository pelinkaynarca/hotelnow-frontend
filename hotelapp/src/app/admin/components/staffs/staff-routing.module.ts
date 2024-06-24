import { NgModule } from '@angular/core';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { RouterModule, Routes } from '@angular/router';
import { AddStaffComponent } from './add-staff/add-staff.component';

const routes: Routes = [
  {
    path: '',
    component: ListStaffComponent
  },
  {
    path: 'create',
    component: AddStaffComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
