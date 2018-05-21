import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { Notice } from './notification';
import { UserProfile } from '../../user/shared/user';

@Injectable()
export class NotificationService {
  notifications$: Observable<Notice[]>;
  notificationsPendingApproval$: BehaviorSubject<Notice[]>;

  constructor(
    public afs: AngularFirestore
  ) {}

  setUserNotifications(notifications: Notice[]): void {
    this.notifications$ = Observable.of(notifications);
  }





}
