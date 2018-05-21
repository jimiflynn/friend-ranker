import { Component, OnInit } from '@angular/core';
import { PhotosService } from './shared/photos.service';
import { Photo, AlbumConfig } from './shared/photos';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photos: any[] = [];
  constructor(
    private photoService: PhotosService
  ) {
  }

  selectPhoto(photo: { url: string }, meta: any) {
    console.log('photo selected', meta);
  }

  ngOnInit() {
    let config = {
      limit: 3,
      height: 225,
      width: 200
    }
    this.photos = this.photoService.loadAlbum(config);
    // for (let i = 0, len = 6; i < len; i++) {
    //   this.photos.push({ url: 'https://placekitten.com/200/225' });
    // }
  }

}
