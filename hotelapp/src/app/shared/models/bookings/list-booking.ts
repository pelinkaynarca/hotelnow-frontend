import { ListCustomer } from "../customers/list-customer";

export class ListBooking {
  id: number;
  hotelId: number;
  bookedAt: Date;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  customer: ListCustomer;
}
