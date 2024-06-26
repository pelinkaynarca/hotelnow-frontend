import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  
  dropdownOpen = false;

  constructor(private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    
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
