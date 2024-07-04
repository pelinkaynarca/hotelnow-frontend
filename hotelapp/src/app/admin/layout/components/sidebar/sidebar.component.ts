import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit{
  isBookingsCollapsed = true;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.router.url.startsWith('/admin/bookings')) {
      this.isBookingsCollapsed = false;
    }
  }

  isAdmin(): boolean {
    return this.authService.canShowForRoles(['ADMIN']);
  }

  isManager(): boolean {
    return this.authService.canShowForRoles(['MANAGER']);
  }
}
