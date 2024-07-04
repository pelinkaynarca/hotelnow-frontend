import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { BookingService } from 'src/app/services/common/models/booking.service';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { BookingStatus } from 'src/app/shared/models/bookings/booking-status';
import { ListBooking } from 'src/app/shared/models/bookings/list-booking';

@Component({
  selector: 'app-list-pending-booking',
  templateUrl: './list-pending-booking.component.html',
  styleUrls: ['./list-pending-booking.component.scss']
})
export class ListPendingBookingComponent implements OnInit {

  pendingBookings: ListBooking[];

  constructor(private bookingService: BookingService,private router: Router,private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    this.pendingBookings = await this.bookingService.getByStatus(BookingStatus.PEND) as ListBooking[];
  }

  cancel(bookingId: number) {
    this.bookingService.cancel(bookingId,async (response) =>{
      const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
        if (result.dismiss) {
          this.router.navigate([this.router.url]);
        }
    },error=>{
    });
  }

  approve(bookingId: number) {
    this.bookingService.approve(bookingId,async (response) =>{
      const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
        if (result.dismiss) {
          this.router.navigate([this.router.url]);
        }
    },error=>{
    });
  }
}
