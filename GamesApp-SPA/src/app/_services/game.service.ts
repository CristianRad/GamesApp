import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '../_models/comment';
import { Game } from '../_models/game';
import { PaginatedResult } from '../_models/pagination';
import { UserRating } from '../_models/userRating';
import { environment } from 'src/environments/environment';

@Injectable()
export class GameService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGames(page?, itemsPerPage?, gameParams?): Observable<PaginatedResult<Game[]>> {
    const paginatedResult: PaginatedResult<Game[]> = new PaginatedResult<Game[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (gameParams != null) {
      params = params.append('minPrice', gameParams.minPrice);
      params = params.append('maxPrice', gameParams.maxPrice);
      params = params.append('type', gameParams.type);
      params = params.append('orderBy', gameParams.orderBy);
    }

    return this.http.get<Game[]>(this.baseUrl + 'games', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(this.baseUrl + 'games/' + id);
  }

  addGame(game: Game) {
    return this.http.post(this.baseUrl + 'games', game);
  }

  updateGame(id: number, game: Game) {
    return this.http.put(this.baseUrl + 'games/' + id, game);
  }

  deleteGame(id: number) {
    return this.http.delete(this.baseUrl + 'games/' + id);
  }

  addComment(gameId: number, comment: Comment) {
    return this.http.post(this.baseUrl + 'games/' + gameId + '/comments', comment);
  }

  deleteScreenshot(gameId: number, id: number) {
    return this.http.delete(this.baseUrl + 'games/' + gameId + '/screenshots/' + id);
  }

  purchaseGame(gameId: number) {
    return this.http.post(this.baseUrl + 'games/' + gameId + '/purchased', {});
  }

  sendGameRating(gameeId: number, rating: UserRating): Observable<UserRating> {
    return this.http.post<UserRating>(this.baseUrl + 'games/' + gameeId + '/ratings', rating);
  }

  downloadKey(gameId: number) {
    return this.http.get(this.baseUrl + 'games/' + gameId + '/download');
  }
}
