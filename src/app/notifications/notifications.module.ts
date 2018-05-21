import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NotificationsComponent } from './notifications.component';
import { NotificationService } from './shared/notification.service';
import { NotificationsRoutingModule } from './notifications-routing.module';

@NgModule({
  imports: [
    SharedModule,
    NotificationsRoutingModule
  ],
  declarations: [
    NotificationsComponent
  ],
  exports: [
    NotificationsComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationsModule { }
