import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListStaffComponent, AddStaffComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class StaffModule {}
