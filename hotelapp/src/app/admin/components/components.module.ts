import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypeModule } from './room-types/room-type.module';
import { RoomTypeImageComponent } from './room-type-image/room-type-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    RoomTypeImageComponent,
  ],
  imports: [
    CommonModule,
    RoomTypeModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports:[
    RoomTypeImageComponent
  ]
})
export class ComponentsModule { }
