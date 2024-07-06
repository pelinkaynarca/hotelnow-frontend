import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/common/models/hotel.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { StaffService } from 'src/app/services/admin/staff.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeHotelCount: number;
  totalRoomTypeCount: number;
  totalStaffManagerCount: number;
  totalCustomerCount: number;
  totalManagerCount: number;

  constructor(
    private hotelService: HotelService,
    private userService: UserService,
    private authService: AuthService,
    private roomTypeService: RoomTypeService,
    private staffService: StaffService
  ){}

  ngOnInit(): void {
    this.getAllData(); 
  }

  async getAllData(): Promise<void> {
    const [hotels, users, roomTypes, staffManager] = await Promise.all([
      this.hotelService.getAll(),
      this.userService.getAll(),
      this.roomTypeService.getRoomTypeForStaff(),
      this.staffService.getStaffsOfHotel()
    ]);

    if (Array.isArray(hotels)) {
      this.activeHotelCount = hotels.filter(hotel => hotel.active).length;
    }
    
    if(Array.isArray(roomTypes))
      this.totalRoomTypeCount = roomTypes.length;

    if(Array.isArray(staffManager))
      this.totalStaffManagerCount = staffManager.length;

    if (Array.isArray(users)) {
      this.totalCustomerCount = users.filter(user => user.role === 'CUSTOMER').length;
      this.totalManagerCount = users.filter(user => user.role === 'MANAGER').length;
    }

  }

  isAdmin(): boolean {
    return this.authService.canShowForRoles(['ADMIN']);
  }

  isManager(): boolean {
    return this.authService.canShowForRoles(['MANAGER']);
  }
}
