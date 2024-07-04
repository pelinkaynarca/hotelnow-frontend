import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/common/models/booking.service';
import { BookingStatus } from 'src/app/shared/models/bookings/booking-status';
import { ListBooking } from 'src/app/shared/models/bookings/list-booking';

@Component({
  selector: 'app-list-cancelled-booking',
  templateUrl: './list-cancelled-booking.component.html',
  styleUrls: ['./list-cancelled-booking.component.scss']
})
export class ListCancelledBookingComponent implements OnInit{
  cancelledBookings: ListBooking[];

  constructor(private bookingService: BookingService){}

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    this.cancelledBookings = await this.bookingService.getByStatus(BookingStatus.CANC) as ListBooking[];
  }
}
