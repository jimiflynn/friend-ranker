import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService, User } from '../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  set showSideNav(isOpen: Observable<boolean>) {
    this._navIsOpen = isOpen;
  };

  get showSideNav(): Observable<boolean> {
    return this._navIsOpen;
  }

  @Output() toggleLeft = new EventEmitter<any>();
  @Output() toggleRight = new EventEmitter<any>();

  private _navIsOpen: Observable<boolean>;
  user: any;
  username: string;
  userPhoto: string;
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    public router: Router) {
  }

  toggleNav() {

    return this.toggleLeft.emit();
  };

  toggleFeatureDrawer() {
    return this.toggleRight.emit();
  };

  googleLogin() {
    return this.auth.googleLogin()
      .then(() => {
        console.log(`google login`);
        this.router.navigate(['../../../user']);
      });
  }

  facebookLogin() {
    return this.auth.facebookLogin()
      .then(() => {
        console.log(`facebook login`);
        this.router.navigate(['../../../user']);

      });
  }

  logout() {
    return this.auth.signOut();
  }

  ngOnInit() {
  }
}
