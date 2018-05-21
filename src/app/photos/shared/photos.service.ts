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

import { Photo, AlbumConfig } from './photos';


@Injectable()
export class PhotosService {
  private photosCollection: AngularFirestoreCollection<Photo>;
  private userPhotosCollection: AngularFirestoreCollection<Photo>;
  private photoDataDocument: AngularFirestoreDocument<Photo>;

  photos$: Observable<Photo[]>;
  userPhotos$: Observable<Photo[]>;

  baseURL = 'https://placekitten.com';

  defaultConfig = {
    limit: 6,
    height: 100,
    width: 100
  }
  constructor(
    public afs: AngularFirestore
  ) { }

  loadAlbum(
    config: AlbumConfig = this.defaultConfig
  ): any[] {
    const album = [];
    for (let i = 0, len = config.limit; i < len; i++) {
      album[i] = { url: `${this.baseURL}/${config.width}/${config.height}` };
    }
    return album;
  }

}
