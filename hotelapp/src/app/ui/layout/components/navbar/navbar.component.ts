import { Component } from '@angular/core';
import { LanguageComponent } from 'src/app/dialogs/language/language.component';
import { CurrencyComponent } from 'src/app/dialogs/currency/currency.component';
import { DialogService } from 'src/app/services/common/dialog.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuOpen = false;

  constructor(private dialogService: DialogService) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
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