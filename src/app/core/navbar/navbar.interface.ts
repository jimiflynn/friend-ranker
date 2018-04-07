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
    'name': 'Trophies',
    'routerLink': '/trophies',
    'routerActive': 'active',
    'icon': 'fa-trophy'
  },
  {
    'name': 'Notifications',
    'routerLink': '/notifications',
    'routerActive': 'active',
    'icon': 'fa-bell'
  }
]
