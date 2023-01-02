import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouteName } from 'src/app/core/models/routes-name.model';

const routes: Routes = [
  {
    path: '',
    redirectTo: RouteName.AuthLogin,
    pathMatch: 'full'
  },
  {
    path: RouteName.AuthLogin,
    component: LoginComponent
  },
  {
    path: RouteName.AuthRegister,
    component: RegisterComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
