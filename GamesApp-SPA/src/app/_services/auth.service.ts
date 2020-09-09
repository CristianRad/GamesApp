import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (!this.jwtHelper.isTokenExpired(token)) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this.currentUser = JSON.parse(localStorage.getItem('user')) as User;
      return true;
    }
    return false;
  }

  syncCurrentUser() {
    this.userService.getUser(this.currentUser.id).subscribe(
      user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;
      }
    );
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    if (this.loggedIn) {
      const userRole = this.decodedToken.role;
      if (allowedRoles.includes(userRole)) {
        isMatch = true;
      }
    }
    return isMatch;
  }
}
