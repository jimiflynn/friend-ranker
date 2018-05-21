export class Story {
  id: string | number;
  postedBy: StoryAuthorInfo;
  content: StoryContent;
  timeStamp: Date;
  edited?: boolean;
}

export interface StoryContent extends Story {
  text: string,
  title?: string,
  tagged?: any[]
}

export interface StoryAuthorInfo extends Story {
  userId: string,
  username?: string,
  photoURL?: string
}
