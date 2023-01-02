import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteName } from './core/models/routes-name.model';

const routes: Routes = [
  { 
    path: '', redirectTo: RouteName.Tasks, pathMatch: 'full', 
  },
  {
    path: RouteName.Auth,
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: RouteName.Tasks,
    loadChildren: () => import('./modules/to-do/to-do.module').then((m) => m.ToDoModule),
  },
  {
    path: '**',
    redirectTo: RouteName.Tasks
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
