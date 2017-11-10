import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared';
import { ReactiveFormsModule } from '@angular/forms';


const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: []
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: []
  }
]);


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    authRouting
  ],
  declarations: [AuthComponent]
})
export class AuthModule { }
