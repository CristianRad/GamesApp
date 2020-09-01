import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Game } from '../_models/game';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  getUserPurchasedGames(id: number, page?, itemsPerPage?, gameParams?): Observable<PaginatedResult<Game[]>> {
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

    return this.http.get<Game[]>(this.baseUrl + 'users/' + id + '/purchasedgames', { observe: 'response', params })
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
}
