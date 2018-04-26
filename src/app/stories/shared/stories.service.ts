import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { Story, MOCK_STORIES } from './stories';

@Injectable()
export class StoriesService {
  private storiesCollection: AngularFirestoreCollection<Story>;
  private userStoriesCollection: AngularFirestoreCollection<Story>;
  private storyDataDocument: AngularFirestoreDocument<Story>;

  stories$: Observable<Story[]>;
  userStories$: Observable<Story[]>;
  constructor(public afs: AngularFirestore) {
    this.storiesCollection = this.afs.collection<Story>(`stories`);
    this.stories$ = this.storiesCollection.valueChanges();
  }

  getUserStories(userId: string): void {
    this.userStoriesCollection = this.afs.collection<Story>(`users/${userId}/stories`);
    this.userStories$ = this.userStoriesCollection.valueChanges();
  }

  getStoryById(storyId: string | number): Observable<any> {
    this.storyDataDocument = this.afs.doc<Story>(`stories/${storyId}`);
    return this.storyDataDocument.valueChanges();
  }

  getMockStories(): Story[] {
      return MOCK_STORIES;
  }



}
