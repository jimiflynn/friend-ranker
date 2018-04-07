import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserModule } from './user/user.module';
import { StoriesModule } from './stories/stories.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FlexLayoutModule,
    CoreModule,
    SharedModule,
    UserModule,
    AppRoutingModule,
    StoriesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
