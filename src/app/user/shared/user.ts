export class UserProfile implements User {
  constructor(
    public uid?: User['uid'],
    public email?: User['email'],
    public photoURL?: User['photoURL'],
    public username?: User['username'],
    public displayName?: User['displayName'],
    public profile?: User['profile'],
    public friends?: User['friends']) {
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
  friends?: any[];
}

export class EditedUser extends UserProfile {
}
