import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'unauthorized',
        loadChildren: () => import('./components/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {

}