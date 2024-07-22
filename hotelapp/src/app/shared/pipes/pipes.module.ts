import { NgModule } from '@angular/core';
import { LimitPipe } from './text-limit.pipe';
import { ImageArrayPipe } from './image.pipe';
import { ImagesArrayPipe } from './images.pipe';



@NgModule({
  declarations: [LimitPipe, ImageArrayPipe, ImagesArrayPipe],
  exports:[LimitPipe, ImageArrayPipe, ImagesArrayPipe]
})
export class PipesModule { }
