import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Story, StoryContent } from '../shared/stories';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit {
  story: Story;
  friends: any;
  taggedFriends: any[];
  editStory = false;
  constructor(
    public dialogRef: MatDialogRef<Story>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  this.story = data.storyData;
  this.taggedFriends = this.story.content.tagged || [];
  this.friends = data.friends;
}

  tagFriend(event: any) {
    let friend = event.option.value;
    console.log(`getting friend value from event: `, event, friend);
    let friendIndex = this.taggedFriends.indexOf(friend);
    if (friendIndex === -1) {
      this.taggedFriends.push(friend)
    }
  }

  removeTaggedFriend(friend: any, event: any) {
    let friendIndex = this.taggedFriends.indexOf(friend);
    if (friendIndex >= 0) {
      this.taggedFriends.splice(friendIndex, 1);
      console.log(`removing tagged friend [${friendIndex}]...`, friend, event);
    }
  }

  toggleEdit() {
    this.editStory = !this.editStory;
  }

  ngOnInit() {
  }

}
