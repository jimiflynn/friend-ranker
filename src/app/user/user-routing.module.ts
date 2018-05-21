import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { AuthService } from '../core/auth/auth.service';
import { UserComponent } from './user.component';
import { StoriesComponent } from '../stories/stories.component';
import { PhotosComponent } from '../photos/photos.component';
import { NotificationsComponent } from '../notifications/notifications.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: StoriesComponent
      },
      {
        path: '', component: PhotosComponent, outlet: 'photos'
      },
      {
        path: '', component: NotificationsComponent, outlet: 'notifications'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class UserRoutingModule { }
