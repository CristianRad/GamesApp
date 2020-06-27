import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Game } from '../_models/game';
import { environment } from 'src/environments/environment';

@Injectable()
export class GameService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseUrl + 'games');
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(this.baseUrl + 'games/' + id);
  }

  updateGame(id: number, game: Game) {
    return this.http.put(this.baseUrl + 'games/' + id, game);
  }

  deleteScreenshot(gameId: number, id: number) {
    return this.http.delete(this.baseUrl + 'games/' + gameId + '/screenshots/' + id);
  }
}
