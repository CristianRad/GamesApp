import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class UserEditResolver implements Resolve<User> {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your personal data');
                this.router.navigate(['/games']);
                return of(null);
            })
        );
    }
}
