import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { AuthGuard } from '../core/auth/auth.guard';
import { AuthService } from '../core/auth/auth.service';
import { UserComponent } from './user.component';
import { UserService } from './shared/user.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AvatarGeneratorComponent } from '../shared/avatar-generator/avatar-generator.component';


@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [UserComponent, UserEditComponent],
  providers: [UserService],
  exports: [UserComponent],
  entryComponents: [UserEditComponent, AvatarGeneratorComponent]

})
export class UserModule { }
