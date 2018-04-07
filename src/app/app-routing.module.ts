import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const app_routes: Routes = [
  {
    path: '',
    children: [

      { path: 'login', component: LoginComponent },
      // { path: 'user', component: UserComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'login' }
]}
];




@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(app_routes, {enableTracing: false})
  ],
  declarations: [],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
