import { ListCustomer } from "../customers/list-customer";

export class CancelBooking {
  id: number;
  reason: String;
  hotelId?: number;
  bookedAt?: Date;
  checkInDate?: Date;
  checkOutDate?: Date;
  guestCount?: number;
  customer?: ListCustomer;
}
