import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

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
import { UserProfile } from './shared/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  showEditProfileContainer: boolean = false;
  printedUserData: any;
  userEdited: Observable<UserProfile>;
  usernameFilter$: BehaviorSubject<string | null>;
  userEmailFilter$: BehaviorSubject<string | null>;
  userPhotoFilter$: BehaviorSubject<string | null>;
  editedUserParts: any = {};

  constructor(
    public userData: UserService,
    public auth: AuthService
  ) {
  }


  toggleEditProfileContainer(): void {
    this.showEditProfileContainer = !this.showEditProfileContainer;
  }

  private editUserProfileData(userId: string, data: UserProfile) {
    return this.userData.updateUserData(userId, data);
  }

  private validateUsername(input: string | any | null, event?: any, userId?: string) {
    this.editedUserParts.username = input;
  }

  private validateUserEmail(input: string | any | null, event?: any, userId?: string) {
    this.editedUserParts.email = input;
  }

  private validateUserPhoto(input: string | any | null, event?: any, userId?: string) {
    this.editedUserParts.photo = input;
  }

  getUsernameErrorMessage(): string {
    return `Either username is taken or not proper format!!`;
  }

  submitNewUserProfileData(userId: string, event: Event, data: UserProfile, options?: any) {
    console.log('data [profile change data]', data);
    console.log('event [profile change event]', event);
    console.log('options [profile change options]', options);
    this.userEdited = Observable.of(this.editedUserParts);
    return this.editUserProfileData(userId, this.editedUserParts)
      .then(res => console.log(`new user profile data`, res));
  }


  viewUserData(user: any): void {
    this.userData.loadUserDataById(user.uid)
      .subscribe(res => {
        this.printedUserData = res;
        console.log(`current user data: `, this.printedUserData);
      });
  }

  ngOnInit() {

  }

}
