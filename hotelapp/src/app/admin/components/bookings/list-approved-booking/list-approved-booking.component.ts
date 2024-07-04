import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/common/models/booking.service';
import { BookingStatus } from 'src/app/shared/models/bookings/booking-status';
import { ListBooking } from 'src/app/shared/models/bookings/list-booking';

@Component({
  selector: 'app-list-approved-booking',
  templateUrl: './list-approved-booking.component.html',
  styleUrls: ['./list-approved-booking.component.scss']
})
export class ListApprovedBookingComponent implements OnInit {

  approvedBookings: ListBooking[];

  constructor(private bookingService: BookingService){}

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    this.approvedBookings = await this.bookingService.getByStatus(BookingStatus.APPR) as ListBooking[];
  }
}
