import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';
import { StoriesService } from './shared/stories.service';
import { StoryDetailsComponent } from './story-details/story-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoriesRoutingModule
  ],
  declarations: [StoriesComponent, StoryDetailsComponent],
  providers: [StoriesService],
  exports: [StoriesComponent],
  entryComponents: [StoryDetailsComponent]
})
export class StoriesModule { }
