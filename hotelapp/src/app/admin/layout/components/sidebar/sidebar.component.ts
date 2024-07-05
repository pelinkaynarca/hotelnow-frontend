import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit{
  isBookingsCollapsed = true;
  @Input() sidebarOpen: boolean;
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.router.url.startsWith('/admin/bookings')) {
      this.isBookingsCollapsed = false;
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  isAdmin(): boolean {
    return this.authService.canShowForRoles(['ADMIN']);
  }

  isManager(): boolean {
    return this.authService.canShowForRoles(['MANAGER']);
  }
}
