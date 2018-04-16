import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthService } from './auth.service';


@Injectable()
export class PreventAccessGuard implements CanActivate {
  loggedIn: Observable<boolean> | boolean;
  constructor(
    private auth: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.loggedIn = this.checkStatus();
      return this.loggedIn;
  }
  private checkStatus(): Observable<boolean> {
    return this.auth.user$
    .take(1)
    .map(user => !!user)
    .switchMap(user => {
      if (!user) {
        console.log(`acces-granted! User is not logged in`);
        return Observable.of(true);
      }
      this.router.navigate([`../../user`]);
      console.log(`acces-prevented! User is logged in`);
      return Observable.of(false);
    });

  }
}
