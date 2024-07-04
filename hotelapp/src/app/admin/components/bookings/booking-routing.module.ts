import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPendingBookingComponent } from './list-pending-booking/list-pending-booking.component';
import { ListApprovedBookingComponent } from './list-approved-booking/list-approved-booking.component';
import { ListCancelledBookingComponent } from './list-cancelled-booking/list-cancelled-booking.component';



const routes: Routes = [
  {
    path: 'pending-list',
    component: ListPendingBookingComponent
  },
  {
    path: 'approved-list',
    component: ListApprovedBookingComponent
  },
  {
    path: 'cancelled-list',
    component: ListCancelledBookingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
