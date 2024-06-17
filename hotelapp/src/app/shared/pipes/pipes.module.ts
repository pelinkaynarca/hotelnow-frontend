import { NgModule } from '@angular/core';
import { LimitPipe } from './text-limit.pipe';



@NgModule({
  declarations: [LimitPipe],
  exports:[LimitPipe]
})
export class PipesModule { }
