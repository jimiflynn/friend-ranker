import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  googleLogin() {
    return this.auth.googleLogin()
      .then(() => {
        console.log(`google login`);
        this.router.navigate(['../user']);
      });
  }

  facebookLogin() {
    return this.auth.facebookLogin()
      .then(() => {
        console.log(`facebook login`);
        this.router.navigate(['../user']);

      });
  }

  ngOnInit() {
  }

}
