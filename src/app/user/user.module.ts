import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { AuthGuard } from '../core/auth/auth.guard';
import { AuthService } from '../core/auth/auth.service';
import { UserComponent } from './user.component';
import { UserService } from './shared/user.service';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [UserComponent],
  providers: [UserService],
  exports: [UserComponent]
})
export class UserModule { }
