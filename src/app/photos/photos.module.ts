import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosService } from './shared/photos.service';
import { PhotosComponent } from './photos.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PhotosRoutingModule
  ],
  declarations: [PhotosComponent],
  providers: [PhotosService],
  exports: [PhotosComponent]
})
export class PhotosModule { }
