import { Component, OnInit, Input, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MatSnackBar, MatDialog, MatDialogRef, MatDialogClose } from '@angular/material';

import { NotificationService } from './shared/notification.service';
import { AuthService } from '../core/auth/auth.service';
import { Notice } from './shared/notification';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  private userNotifications$: Observable<Notice[]>;

  constructor(
    private auth: AuthService,
    private notificationService: NotificationService,
    public snackBar: MatSnackBar
  ) {}


  ngOnInit() {
    this.auth.user$.do(user => {
      this.userNotifications$ = Observable.of(user.notifications);
    });
  }

}
