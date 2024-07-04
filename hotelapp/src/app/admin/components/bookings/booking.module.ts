import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListApprovedBookingComponent } from './list-approved-booking/list-approved-booking.component';
import { ListPendingBookingComponent } from './list-pending-booking/list-pending-booking.component';
import { ListCancelledBookingComponent } from './list-cancelled-booking/list-cancelled-booking.component';



@NgModule({
  declarations: [ListPendingBookingComponent, ListApprovedBookingComponent, ListCancelledBookingComponent],
  imports: [
    CommonModule, RouterModule
  ]
})
export class BookingModule { }
