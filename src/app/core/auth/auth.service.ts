import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";

import { FacebookService, InitParams, LoginResponse, AuthResponse, LoginOptions } from 'ngx-facebook';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { UserProfile } from '../../user/shared/user';

export interface User extends UserProfile {
}

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider)
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        return this.updateUserData(credential)
      })
  }


  private updateUserData(u): Promise<any> | Observable<any> {
    // Sets user data to firestore on login
    const user = u.user;
    const userRef: AngularFirestoreDocument<UserProfile> = this.afs.doc(`users/${user.uid}`);
    const isNew: boolean = u.additionalUserInfo.isNewUser;

    if (isNew) {
      const newUser: UserProfile = {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        username: (u.additionalUserInfo.profile.first_name || u.additionalUserInfo.profile.given_name),
        displayName: user.displayName,
        profile: u.additionalUserInfo.profile
      }

      console.log(`new user profile: `, newUser);
      if (!newUser.profile.location) {
        newUser.profile.location = {
          id: <string>'',
          name: <string>''
        }
      }
      return userRef.set(newUser, { merge: true });
    } else {
      console.log(`loading user profile: `, userRef.valueChanges());
      return Promise.resolve(userRef.valueChanges());
    }
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['../../login']);
      console.log(`logged out`);

    });
  }

}
