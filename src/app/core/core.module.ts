import { NgModule, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../shared/material.module';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { PreventAccessGuard } from './auth/prevent-access.guard';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [NavbarComponent],
  providers: [AuthService, AuthGuard, PreventAccessGuard],
  exports: [NavbarComponent]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
  throwIfAlreadyLoaded(parentModule, 'CoreModule');
}
}
