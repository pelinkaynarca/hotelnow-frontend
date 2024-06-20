import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
      HeaderComponent,
      SidebarComponent,
      FooterComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
    ],
    exports: [
      HeaderComponent,
      SidebarComponent,
      FooterComponent
    ]
  })
  export class ComponentsModule { }