import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dropdownOpen = false;

  toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
  }

  onOutsideClick() {
    this.dropdownOpen = false;
  }
}
