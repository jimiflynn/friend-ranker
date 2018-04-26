import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoriesService } from '../shared/stories.service';
import { Story } from '../shared/stories';
@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit {
  story: Story;
  constructor(
    public storiesService: StoriesService,
    public dialogRef: MatDialogRef<Story>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  let stories = this.storiesService.getMockStories();
  this.story = stories[data.storyData.storyId];
}

  ngOnInit() {
  }

}
