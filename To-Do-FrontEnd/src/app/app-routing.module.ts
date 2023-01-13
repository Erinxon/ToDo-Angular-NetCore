import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './core/guards/guards.guard';
import { RouteName } from './core/models/routes-name.model';

const routes: Routes = [
  { 
    path: '', redirectTo:  RouteName.Auth, pathMatch: 'full', 
  },
  {
    path: RouteName.Tasks,
    loadChildren: () => import('./modules/to-do/to-do.module').then((m) => m.ToDoModule),
    canActivate: [AuthGuard]
  },
  {
    path: RouteName.Auth,
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NoAuthGuard]
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
