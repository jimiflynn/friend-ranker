import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatList, MatListItem} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { AuthService } from '../core/auth/auth.service';
import { StoriesService } from './shared/stories.service';
import { Story } from './shared/stories';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, AfterViewInit {
@ViewChild(MatListItem) matListItem: MatListItem;
stories: Story[];
mockStories: Story[];
  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    public storiesService: StoriesService
  ) {
  this.mockStories = storiesService.getMockStories();
}

  onStorySelect(storyId: string | number) {
    let storyData = {
      userId: this.auth.user$.map(user => user.uid),
      storyId: storyId
    }
    let dialogRef = this.dialog.open(StoryDetailsComponent, {
      autoFocus: true,
      width: '100%',
      minWidth: '100%',
      position: {top: '33%', right: '0'},
      data: { storyData: storyData }
    });
    dialogRef.beforeClose().subscribe(result => {
      if(result) {
        console.log('SAVING...', result);
      } else {
        console.log('CLOSING...');

      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('COMPLETE!');
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.matListItem);

  }

}
