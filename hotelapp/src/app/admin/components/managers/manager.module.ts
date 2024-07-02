import { NgModule } from "@angular/core";
import { ListManagerComponent } from "./list-manager/list-manager.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { AddManagerComponent } from "./add-manager/add-manager.component";

@NgModule({
    declarations: [
      ListManagerComponent,
      AddManagerComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      SharedModule,
      RouterModule,
      FormsModule
    ],
    exports:[
    ]
  })
export class ManagerModule { }