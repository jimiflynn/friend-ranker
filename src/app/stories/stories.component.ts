import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatList, MatListItem } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { AuthService } from '../core/auth/auth.service';
import { UserService } from '../user/shared/user.service';
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
  fakeFriends: any;
  constructor(
    public auth: AuthService,
    public userService: UserService,
    public dialog: MatDialog,
    public storiesService: StoriesService
  ) {
    userService.getFakeUsers(15)
    .subscribe((res: Response) => this.fakeFriends = {...res.json()});
  }

  onStorySelect(story: Story, meta?: any) {
    let dialogRef = this.dialog.open(StoryDetailsComponent, {
      autoFocus: true,
      width: '60%',
      minWidth: '50%',
      position: { right: '20%' },
      data: { storyData: story, friends: this.fakeFriends.results}
    });
    console.log(`Story Details dialog`, dialogRef, meta);
    dialogRef.beforeClose().subscribe(result => {
      if (result) {
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
  }

}
