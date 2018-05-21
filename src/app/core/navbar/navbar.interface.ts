export interface Link {
  name: string;
  routerLink: string;
  routerActive: string;
  action?: any;
  icon?: string;
}

export const MainMenuDirectory: Link[] = [
  {
    'name': 'Profile',
    'routerLink': '/user',
    'routerActive': 'active',
    'icon': 'fa-user'
  },
  {
    'name': 'Stories',
    'routerLink': '/stories',
    'routerActive': 'active',
    'icon': 'fa-book'
  },
  {
    'name': 'Photos',
    'routerLink': '/photos',
    'routerActive': 'active',
    'icon': 'fa-camera'
  },
  {
    'name': 'Notifications',
    'routerLink': '/notifications',
    'routerActive': 'active',
    'icon': 'fa-bell'
  }
]
