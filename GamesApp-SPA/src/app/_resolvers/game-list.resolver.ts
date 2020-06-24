import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Game } from '../_models/game';
import { AlertifyService } from '../_services/alertify.service';
import { GameService } from '../_services/game.service';

@Injectable()
export class GameListResolver implements Resolve<Game[]> {
    constructor(
        private gameService: GameService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Game[]> {
        return this.gameService.getGames().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
