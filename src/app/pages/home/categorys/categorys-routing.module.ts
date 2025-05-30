import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorysPage } from './categorys.page';

const routes: Routes = [
  {
    path: '',
    component: CategorysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorysPageRoutingModule {}
