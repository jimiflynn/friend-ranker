import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatGridList } from '@angular/material/grid-list';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { AuthService, User } from '../core/auth/auth.service';
import { UserService } from './shared/user.service';
import { UserProfile, EditedUser } from './shared/user';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AvatarGeneratorComponent } from '../shared/avatar-generator/avatar-generator.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild(MatGridList) matGridList: MatGridList;
  showEditProfileContainer: boolean = false;
  showAvatarGenerator: boolean = false;
  printedUsername: any;
  userEdited: Subject<UserProfile>;


  constructor(
    public userService: UserService,
    public auth: AuthService,
    public dialog: MatDialog
  ) {
    this.userEdited = new BehaviorSubject<UserProfile | EditedUser>(null)
  }

  toggleAvatarGenerator(data?: any) {
    let dialogRef = this.dialog.open(AvatarGeneratorComponent, {
      autoFocus: true,
      hasBackdrop: true,
      width: '50%',
      minWidth: '50%',
      height: 'auto',
      position: {right: '25%'},
      data: { user: data }
    })
    console.log(`avatar event`, dialogRef);
    dialogRef.beforeClose().subscribe(result => {
      if(result && result !== 'canceled') {
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
      position: {top: '60px', right: '25%', bottom: '0'},
      data: { user: data }
    });
    dialogRef.beforeClose().subscribe(result => {
      if(result) {
        console.log('SAVING...', result);
        this.updateUserProfile(result.uid, result)
      } else {
        console.log('CLOSING...');

      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('COMPLETE!');
    });
    // this.showEditProfileContainer = !this.showEditProfileContainer;
  }

  updateUserProfile(id: string, data: any): void {
    this.userEdited.next(data);
    this.userService.updateUserData(id, data);
  }


  loadUser(user: any): void {
    this.userService.loadUserDataById(user.uid)
      this.userService.user$.subscribe(res => {
        console.log(`CURRENT USER: loaded => ${res.username}`);
      });
  }

  setAvatarImage(img: any) {
    const enabledAvatar = this.userService.user$.map(user => {
      if(user.profile.useAvatar) { return user.profile.avatarBuildURL };
    });
    console.log(`avatar`, img);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
