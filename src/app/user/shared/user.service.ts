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
import { UserProfile, EditedUser } from './user';

@Injectable()
export class UserService {
  private fakeUrl = `https://randomuser.me/api/`;
  private usersCollection: AngularFirestoreCollection<UserProfile>;
  private userDataDocument: AngularFirestoreDocument<UserProfile>;
  userStream$: Subject<UserProfile>;
  users$: Observable<UserProfile[]>;
  user$: Observable<UserProfile>;

  constructor(
    public afs: AngularFirestore,
    private http: Http) {
      this.usersCollection = this.afs.collection<UserProfile>(`users`);
      this.users$ = this.usersCollection.valueChanges();
      this.userStream$ = new BehaviorSubject<UserProfile>(null);
  }

  getFakeUsers = (limit: number): Observable<any> => {
    const url: string = `${this.fakeUrl}?results=${limit}`;
    return this.http.get(`${url}`);
  }

  loadUserDataById = (userId: string): void => {
    this.userDataDocument = this.afs.doc<UserProfile>(`users/${userId}`);
    this.user$ = this.userDataDocument.valueChanges();
  }

  updateUserData = (userId: string, userData: UserProfile | EditedUser | any): Promise<any> => {
    this.loadUserDataById(userId);
    // Sets user data to firestore
    console.log('DB => Upload Completed at:', new Date().toString());
    return this.userDataDocument.update(userData);
  }

  queryUsernames = (username: any, userId?: string): Observable<UserProfile[] | null> => {
    return this.afs.collection<UserProfile>('users', ref => {
      let query: firebase.firestore.Query = ref;
      query = query.where('username', '==', username);
      return query;
    }).valueChanges();

  }




}
