import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import { UserProfile } from './user';

@Injectable()
export class UserService {
  private usersCollection: AngularFirestoreCollection<UserProfile>;
  private userDataDocument: AngularFirestoreDocument<UserProfile>;

  users$: Observable<UserProfile[]>;
  user$: Observable<UserProfile>;

  constructor(public afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<UserProfile>(`users`);
    this.users$ = this.usersCollection.valueChanges();
  }


  loadUserDataById(userId: string): Observable<UserProfile> {
    this.userDataDocument = this.afs.doc<UserProfile>(`users/${userId}`);
    this.user$ = this.userDataDocument.valueChanges();
    return this.user$;
  }

  queryUsernames(username: any): Observable<any | null> {
    return this.afs.collection<UserProfile>('users', ref => {
        let query : firebase.firestore.Query = ref;
        if (username) { query = query.where('username', '==', username) };
        console.log(`query username`, username);
        return query;
      }).valueChanges()
  }

  updateUserData(userId: string, userData: UserProfile | any): Promise<any> {
    // Sets user data to firestore on login
    console.log('User data', userData);
    return this.afs.doc<UserProfile>(`users/${userId}`).update(userData);
  }

}
