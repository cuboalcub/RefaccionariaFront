import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { Login } from './pages/login/login';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    Login
  ]
})
export class AuthModule {}
