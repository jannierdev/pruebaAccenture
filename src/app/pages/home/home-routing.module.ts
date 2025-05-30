import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'todos',
        loadChildren: () => import('./todos/todos.module').then(m => m.TodosPageModule)
      },
      {
        path: 'categorys',
        loadChildren: () => import('./categorys/categorys.module').then(m => m.CategorysPageModule)
      },
      {
        path: '',
        redirectTo: '/home/todos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/todos',
    pathMatch: 'full'
  },
  {
    path: 'categorys',
    loadChildren: () => import('./categorys/categorys.module').then( m => m.CategorysPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
