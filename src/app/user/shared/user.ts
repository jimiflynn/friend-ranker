import { Notice } from '../../notifications/shared/notification';

export class UserProfile implements User {
  constructor(
    public uid?: User['uid'],
    public email?: User['email'],
    public photoURL?: User['photoURL'],
    public username?: User['username'],
    public displayName?: User['displayName'],
    public profile?: User['profile'],
    public stories?: User['stories'],
    public photos?: User['photos'],
    public friends?: User['friends'],
    public notifications?: User['notifications']) {
  }
}

export class User {
  uid?: string;
  token?: string;
  email?: string;
  photoURL?: string;
  username?: string;
  displayName?: string;
  profile?: any;
  stories?: any[];
  photos?: Photo[];
  friends?: Friend[];
  notifications?: Notice[];
}

export class EditedUser extends UserProfile {
}

export interface Photo {
  id: string | number;
  postedBy: string;
  url: string;
  caption?: string;
}

export class Friend extends UserProfile {
}
