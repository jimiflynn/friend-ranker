import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserProfile, EditedUser } from '../shared/user';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import 'rxjs/add/operator/switchMap';
// import { map, tap, filter, debounceTime, distinctUntilChanged, switchMap, reduce } from 'rxjs/operators';


class UsernameError {
  message: string;
  errorType: 'unavailable' | 'length' | 'unkown';
}



@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  // @Input('userData') user: UserProfile;
  // @Output() submitNewUserProfileData = new EventEmitter<EditedUser>();
  // @Output() closeProfileEditContainer = new EventEmitter<boolean>();

  editedUserParts: EditedUser;
  usernameFilter$: BehaviorSubject<string | null>;
  usernameValidated = false;
  usernameError: Observable<UsernameError>;
  useAvatar: boolean;

  private _stagedUsername: string;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.usernameFilter$ = new BehaviorSubject(null);

    this.editedUserParts = {
      username: data.user.username ? data.user.username : null,
      email: data.user.email ? data.user.email : null,
      photoURL: data.user.photoURL ? data.user.photoURL : null,
      profile: data.user.profile ? data.user.profile : {
        location: {
          name: '', id: 0
        },
        useAvatar: false
      }
    }
  }


  addNewUserData(data: EditedUser) {
    if (this._stagedUsername) {
      data.username = this._stagedUsername;
    }
    this.dialogRef.close(data);
  }

  closeEditContainer() {
    this.dialogRef.close('dismissed');
  }

  getUsernameErrorMessage(): string {
    return `Either username is taken or not proper format!!`;
  }

  onNoClick(): void {
    this.dialogRef.close('dismissed');
  }

  onUsernameInput(queryString: string | null) {
    if (queryString !== null && queryString !== this.editedUserParts.username && queryString.length > 3) {
      this.usernameFilter$.next(queryString);
    }
  }

  validateUsername(queryString: string, queryResults: UserProfile[]): void {
    if (queryResults && queryResults.length !== 0) {
      this.usernameValidated = false;
      console.log('username not available');
    } else {
      this.usernameValidated = true;
      this._stagedUsername = queryString;
      console.log('username available');
    }
  }

  ngOnInit() {
    this.usernameFilter$.subscribe({
      next: (queryString) => {
        this.userService.queryUsernames(queryString)
          .subscribe(user => {
            this.validateUsername(queryString, user);
          });
        console.log(`searching for ${queryString}...`);
      }
    })
  }

}
