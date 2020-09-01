import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../../_models/game';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { GameService } from 'src/app/_services/game.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Game[];
  purchased: boolean;
  pagination: Pagination;
  typeList = [
    { value: 'action', display: 'Action' },
    { value: 'adventure', display: 'Adventure' },
    { value: 'racing', display: 'Racing' },
    { value: 'rpg', display: 'RPG' },
    { value: 'simulation', display: 'Simulation' },
    { value: 'sports', display: 'Sports' },
  ];
  gameParams: any = {};

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private gameService: GameService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.purchased = this.route.snapshot.url[0].path === 'purchasedgames';
    this.route.data.subscribe(data => {
      this.games = data['games'].result;
      this.pagination = data['games'].pagination;
    });

    this.gameParams.minPrice = 0;
    this.gameParams.maxPrice = 100;
    this.gameParams.type = '';
    this.gameParams.orderBy = 'year';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadGames();
  }

  resetFilters() {
    this.gameParams.minPrice = 0;
    this.gameParams.maxPrice = 100;
    this.gameParams.type = '';
    this.loadGames();
  }

  loadGames() {
    if (this.purchased) {
      this.userService
        .getUserPurchasedGames(
          parseInt(this.authService.decodedToken.nameid, 10), this.pagination.currentPage, this.pagination.itemsPerPage, this.gameParams)
        .subscribe((res: PaginatedResult<Game[]>) => {
          this.games = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        }
      );
    } else {
      this.gameService
        .getGames(this.pagination.currentPage, this.pagination.itemsPerPage, this.gameParams)
        .subscribe((res: PaginatedResult<Game[]>) => {
          this.games = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        }
      );
    }
  }
}
