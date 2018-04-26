import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserProfile, EditedUser } from '../shared/user';
import { Observable } from 'rxjs/Observable';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

interface ReadyToEmit {
  data?: EditedUser
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  // @Input('userData') user: UserProfile;
  //
  // @Output() submitNewUserProfileData = new EventEmitter<EditedUser>();
  // @Output() closeProfileEditContainer = new EventEmitter<boolean>();
  // user: UserProfile | EditedUser;
  editedUserParts: EditedUser;
  useAvatar: true;
  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editedUserParts = data.user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveAvatarURL(url?: string | any) {
    this.editedUserParts.profile.useAvatar = true;
    this.editedUserParts.profile.avatarURL = url;
  }

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

  addNewUserData(data: EditedUser) {
    this.dialogRef.close(data);
  }

  closeEditContainer() {
    this.dialogRef.close();
  }

  getUsernameErrorMessage(): string {
    return `Either username is taken or not proper format!!`;
  }

  ngOnInit() {
  }

}
