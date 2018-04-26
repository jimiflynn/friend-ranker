export class Story {
  // constructor(
  //   id: string | number,
  //   postedBy: StoryAuthor,
  //   content: StoryContent,
  //   timeStamp: Date,
  //   edited?: boolean
  // ) {}
  id: string | number;
  postedBy: StoryAuthor;
  content: StoryContent;
  timeStamp: Date;
  edited?: boolean;
}

interface StoryAuthor {
  userId: string;
  username?: string;
  photoURL?: string;
}

interface StoryContent {
  title: string;
  text: string;
}

export const MOCK_STORIES: Story[] = [
  {
    id: 1,
    postedBy: {
      userId: '1',
      username: 'Billy',
    },
    content: {
      title: 'Title One',
      text: 'Text for story one'
    },
    timeStamp: new Date(),
    edited: false
  },
  {
    id: 2,
    postedBy: {
      userId: '2',
      username: 'Bobby',
    },
    content: {
      title: 'Title Two',
      text: 'Text for story two'
    },
    timeStamp: new Date(),
    edited: false
  },
  {
    id: 3,
    postedBy: {
      userId: '3',
      username: 'Bucky',
    },
    content: {
      title: 'Title Three',
      text: 'Text for story three'
    },
    timeStamp: new Date(),
    edited: false
  },
  {
    id: 3,
    postedBy: {
      userId: '3',
      username: 'Bucky',
    },
    content: {
      title: 'Title Three',
      text: 'Text for story three'
    },
    timeStamp: new Date(),
    edited: false
  },
  {
    id: 3,
    postedBy: {
      userId: '3',
      username: 'Bucky',
    },
    content: {
      title: 'Title Three',
      text: 'Text for story three'
    },
    timeStamp: new Date(),
    edited: false
  },
  {
    id: 3,
    postedBy: {
      userId: '3',
      username: 'Bucky',
    },
    content: {
      title: 'Title Three',
      text: 'Text for story three'
    },
    timeStamp: new Date(),
    edited: false
  },
  {
    id: 3,
    postedBy: {
      userId: '3',
      username: 'Bucky',
    },
    content: {
      title: 'Title Three',
      text: 'Text for story three'
    },
    timeStamp: new Date(),
    edited: false
  },
]
