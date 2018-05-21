import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatGridList } from '@angular/material/grid-list';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, filter, takeWhile, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { AuthService, User } from '../core/auth/auth.service';
import { UserService } from './shared/user.service';
import { UserProfile, EditedUser } from './shared/user';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AvatarGeneratorComponent } from '../shared/avatar-generator/avatar-generator.component';
import { Notice } from '../notifications/shared/notification';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild(MatGridList) matGridList: MatGridList;

  allUsers: Observable<User[]>;
  currentUserIndex: number | string;
  printedUsername: any;
  showAvatarGenerator: boolean = false;
  showEditProfileContainer: boolean = false;
  showNotifications: boolean = false;

  constructor(
    public userService: UserService,
    public auth: AuthService,
    public dialog: MatDialog
  ) {
    let currentUserUId: string;

    auth.user$.subscribe(currentUser => currentUserUId = currentUser.uid);

    this.allUsers = userService.users$.map(users => {
      setInterval(5000);
      console.log('all users', users);
      return users.filter(user => user.uid !== currentUserUId);
    });

  }

  // isExistingFriendOrRequestPending(user: UserProfile, member: UserProfile) {
  //   const userFriendIndex = user.friends.indexOf(member);
  //     for (let request of user.notifications) {
  //       if (request.to.id === member.uid && request.type === 'friendrequest' && request.pending || userFriendIndex !== -1) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  // }

  loadUser(user: any): void {
    this.userService.loadUserDataById(user.uid);
    this.userService.user$.subscribe(res => {
      console.log(`CURRENT USER: loaded => ${res.username}`);
    });
  }

  sendFriendRequest(currentUser: UserProfile, friend: UserProfile) {
    const requestNotificationConfig: Notice = {
      from: {
        id: currentUser.uid,
        photoURL: currentUser.photoURL,
        username: currentUser.username,
      },
      to: {
        id: friend.uid,
        photoURL: friend.photoURL,
        username: friend.username,
      },
      icon: 'fa fa-users',
      opened: false,
      pending: true,
      subject: 'New Friend Request',
      text: `${currentUser.username} wants to friends with ${friend.username}`,
      timestamp: new Date(),
      type: 'friendrequest',
    }
    currentUser.notifications.push(requestNotificationConfig);
    friend.notifications.push(requestNotificationConfig);

    this.updateUserProfile(currentUser.uid, currentUser);
    this.updateUserProfile(friend.uid, friend);
  }

  setAvatarImage(img: any) {
    const enabledAvatar = this.userService.user$.map(user => {
      if (user.profile.useAvatar) { return user.profile.avatarBuildURL };
    });
    console.log(`avatar`, img);
  }

  toggleAvatarGenerator(data?: any) {
    let dialogRef = this.dialog.open(AvatarGeneratorComponent, {
      autoFocus: true,
      hasBackdrop: true,
      disableClose: true,
      width: '50%',
      minWidth: '50%',
      height: 'auto',
      maxHeight: '400px',
      position: { right: '25%', top: '60px' },
      data: { user: data }
    })
    console.log(`avatar event`, dialogRef.componentInstance);
    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== 'dismissed') {
        console.log('SAVING...', result);
        this.updateUserProfile(result.uid, result)
      } else {
        console.log('CLOSING...');
      }
    });
  }

  toggleEditProfileContainer(data: any): void {
    let dialogRef = this.dialog.open(UserEditComponent, {
      autoFocus: true,
      width: '50%',
      minWidth: '50%',
      minHeight: '100%',
      position: { top: '60px', right: '25%', bottom: '0' },
      data: { user: data }
    });
    console.log(`profile edit event`, dialogRef.componentInstance);
    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== 'dismissed') {
        console.log('SAVING...', result);
        this.userService.updateUserData(data.uid, result)
      } else {
        console.log('DIALOG DISMISSED...');
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('COMPLETE!');
    });
  }

  updateUserProfile(id: string, data: any): void {
    this.userService.updateUserData(id, data);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
