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
          return Observable.of(null);
        }
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailAndPasswordLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((credential) => {
      return this.updateUserData(credential);
    });
  }

  createNewEmailAccount(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      console.log(`new email account`, credential);
      let emailNameIndex = credential.email.indexOf('@');
      let displayName = credential.email.slice(0, emailNameIndex);
      let newUserDefaults = {
        additionalUserInfo: {
          isNewUser: true,
          profile: {
            avatarBuildURL: '../../assets/images/avatar.png',
            userAvatar: false
          }
        },
        displayName: displayName,
        email: credential.email,
        photoURL: '../../assets/images/avatar.png',
        uid: credential.uid
      }
      return this.updateUserData(newUserDefaults);
    });
  }


  private oAuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        return this.updateUserData(credential);
      });
  }

  private updateUserData(u): Promise<any> | Observable<any> {
    // Sets user data to firestore on login
    const user = u.user ? u.user : u;
    const userId = user.uid;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${userId}`);
    const isNew: boolean = u.additionalUserInfo ? u.additionalUserInfo.isNewUser : false;
    const username = u.additionalUserInfo ? u.additionalUserInfo.profile.first_name ? u.additionalUserInfo.profile.first_name : u.additionalUserInfo.profile.given_name ? u.additionalUserInfo.profile.given_name : u.displayName : u.displayName;

    if (isNew) {
      const newUser: User = {
        uid: userId,
        email: user.email,
        photoURL: user.photoURL,
        username: username,
        displayName: user.displayName || username,
        profile: u.additionalUserInfo.profile,
        stories: [{
          id: 0,
          postedBy: {
            userId: 'ADMIN',
            username: 'FriendRanker',
            photoURL: '../../../assets/images/friendRanker_logo_small.svg'
          },
          content: {
            text: `Welcome,
            ${username}. Looks like you don't have any stories!
            Posting stories is how you earn Trophies!
            So POST a freagin Story, already!`,
            title: `You're very first Story (don't make it your last)`
          },
          timeStamp: new Date(),
          edited: false,
          tagged: [
            {
              picture: {
                thumbnail: '../../../assets/images/friendRanker_logo_small.svg'
              },
              name: {
                first: 'FR'
              }
            }
          ]
        }],
        photos: [
          {
            id: 0,
            postedBy: userId,
            url: 'https://placeholder.com/',
            caption: `Welcome to Friendranker`
          }
        ],
        friends: [
          {
            username: 'Jimi',
            photoURL: '../../../assets/images/avatar_lego_2.jpg'
          }
        ],
        notifications: [
          {
            from: {
              id: 'ADMIN',
              username: 'Friendranker',
              photoURL: '../../../assets/images/avatar_lego_2.jpg',
            },
            icon: 'fa fa-user',
            pending: false,
            opened: false,
            subject: 'Welcome!',
            timestamp: new Date(),
            type: 'account',
            text: 'Your Notifications alert you to New Friend Requests, Comments, Tagged Images, Stories and more',
          }
        ]
      }
      console.log(`creating new user profile: `, newUser);
      if (!newUser.profile.location) {
        newUser.profile.location = {
          id: <string>'',
          name: <string>''
        }
      }
      newUser.profile.avatarBuildURL = '../../assets/images/avatar.png';
      newUser.profile.userAvatar = false;
      return userRef.set(newUser, { merge: true });
    } else {
      console.log(`loading user profile... `);
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
