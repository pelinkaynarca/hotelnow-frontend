import { Component, OnInit } from '@angular/core';
import { LanguageComponent } from 'src/app/dialogs/language/language.component';
import { CurrencyComponent } from 'src/app/dialogs/currency/currency.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  menuOpen = false;
  isLoggedIn: boolean;

  constructor(private dialogService: DialogService, private authService: AuthService, private router: Router) { 

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }

  openLanguageDialog() {
    this.dialogService.openDialog({
      componentType: LanguageComponent,
      afterClosed: (result) => {
        console.log(`Selected language: ${result}`);
      }
    });
  }

  openCurrencyDialog() {
    this.dialogService.openDialog({
      componentType: CurrencyComponent,
      afterClosed: (result) => {
        console.log(`Selected currency: ${result}`);
      }
    });
  }
}
