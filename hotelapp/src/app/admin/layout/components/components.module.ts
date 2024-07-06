import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
      HeaderComponent,
      SidebarComponent,
      FooterComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      NgbCollapseModule,
      BrowserAnimationsModule
    ],
    exports: [
      HeaderComponent,
      SidebarComponent,
      FooterComponent
    ]
  })
  export class ComponentsModule { }
