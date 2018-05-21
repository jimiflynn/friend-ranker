export interface Notice {
  from: {
    photoURL: string,
    username: string,
    id?: string,
  },
  opened: boolean,
  pending: boolean,
  text: string,
  timestamp: Date,
  type: 'newfriend' | 'newstory' | 'newmessage' | 'newphoto' | 'friendrequest' | 'account',
  icon?: string,
  id?: string | number,
  subject?: string,
  to?: {
    photoURL: string,
    username: string,
    id?: string,
  },
}
