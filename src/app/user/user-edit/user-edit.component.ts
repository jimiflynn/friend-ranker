import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserProfile, EditedUser } from '../shared/user';
import { Observable } from 'rxjs/Observable';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

interface ReadyToEmit {
  uid: string,
  data?: EditedUser
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input('userData') set _data(data) {
    if(data) {
      console.log(`edited component user input`, data)
      this.user = data;
    }
  }
  private _user: Observable<UserProfile | EditedUser>;
  @Output() submitNewUserProfileData = new EventEmitter<ReadyToEmit>();
  @Output() closeProfileEditContainer = new EventEmitter<boolean>();
  user: UserProfile;
  location: any;
  editedUserParts: EditedUser;
  constructor() { }

  private validateUsername(input: string | any | null, event?: any, userId?: string) {
    this.editedUserParts.username = input;
  }

  private validateLocation(input: string | any | null, event?: any, userId?: string) {
    this.editedUserParts.profile.location = input;
  }

  private validateUserEmail(input: string | any | null, event?: any, userId?: string) {
    this.editedUserParts.email = input;
  }

  private validateUserPhoto(input: string | any | null, event?: any, userId?: string) {
    this.editedUserParts.photoURL = input;
  }

  addNewUserData(userId: string, data: EditedUser) {
    const keys: string[] = Object.keys(data);
    let passedDataObject: ReadyToEmit = {
      uid: userId,
      data: <EditedUser>this.editedUserParts
    }
    for (let i in keys) {
      this.editedUserParts[keys[i]] = data[keys[i]];
    }
    this.submitNewUserProfileData.emit(passedDataObject);
  }

  closeEditContainer() {
    this.closeProfileEditContainer.emit()
  }

  getUsernameErrorMessage(): string {
    return `Either username is taken or not proper format!!`;
  }

  ngOnInit() {
    this.editedUserParts = this.user;
  }

}
