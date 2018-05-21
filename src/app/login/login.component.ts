import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService, User } from '../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLoginForm: {
    email: string,
    password: string
  };
  private _passwordRegExp = `^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$`;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  googleLogin() {
    return this.auth.googleLogin()
      .then((data) => {
        console.log(`google login`, data);
        this.router.navigate(['../user']);
      });
  }

  facebookLogin() {
    return this.auth.facebookLogin()
      .then((data) => {
        console.log(`facebook login`, data);
        this.router.navigate(['../user']);
      });
  }

  createNewEmailAccount(email: string, password: string) {
    return this.auth.createNewEmailAccount(email, password)
    .then((data) => {
      console.log(`new account created with email! => email login`, data);
      this.router.navigate(['../user']);
    });
  }

  emailLogin(email: string, password: string) {
    return this.auth.emailAndPasswordLogin(email, password)
      .then((data) => {
        console.log(`email login`, data, this.userLoginForm);
        this.router.navigate(['../user']);
      });
  }

  ngOnInit() {
  }

}
