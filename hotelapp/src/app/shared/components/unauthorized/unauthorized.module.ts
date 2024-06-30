import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UnauthorizedComponent } from "./unauthorized.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        UnauthorizedComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path:"", component:UnauthorizedComponent}
        ])
    ],
    exports:[
        UnauthorizedComponent
    ]
  })
  export class UnauthorizedModule { }