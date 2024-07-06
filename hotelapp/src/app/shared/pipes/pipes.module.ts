import { NgModule } from '@angular/core';
import { LimitPipe } from './text-limit.pipe';
import { ImageArrayPipe } from './image.pipe';



@NgModule({
  declarations: [LimitPipe, ImageArrayPipe],
  exports:[LimitPipe, ImageArrayPipe]
})
export class PipesModule { }
