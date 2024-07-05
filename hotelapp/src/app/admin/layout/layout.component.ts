import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sidebarOpen: boolean = false;

  onToggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
