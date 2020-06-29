import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game } from '../_models/game';
import { PaginatedResult } from '../_models/pagination';
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

  updateGame(id: number, game: Game) {
    return this.http.put(this.baseUrl + 'games/' + id, game);
  }

  deleteScreenshot(gameId: number, id: number) {
    return this.http.delete(this.baseUrl + 'games/' + gameId + '/screenshots/' + id);
  }
}
