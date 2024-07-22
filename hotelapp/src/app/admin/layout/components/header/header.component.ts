import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();
  dropdownOpen = false;
  @Input() sidebarOpen: boolean = true;

  loggedInUsername:String="-";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      let decodedToken = this.authService.decodeToken();
      this.loggedInUsername = decodedToken.firstName + " " + decodedToken.lastName;
    }
  }

  onToggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleSidebar.emit();
  }

  toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
  onOutsideClick() {
    this.dropdownOpen = false;
  }
}
