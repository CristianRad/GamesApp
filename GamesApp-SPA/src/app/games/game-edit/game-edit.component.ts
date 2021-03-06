import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Game } from 'src/app/_models/game';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GameService } from 'src/app/_services/game.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  @ViewChild('editGameForm') editGameForm: NgForm;
  game: Game;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editGameForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private alertify: AlertifyService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.game = data['game'];
      console.log(this.game.multiplayer);
    });
  }

  updateGame() {
    this.gameService.updateGame(this.game.id, this.game).subscribe(next => {
      this.alertify.success('Game updated successfully');
      this.editGameForm.reset(this.game);
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteGame(id: number) {
    this.alertify.confirm('Are you sure you want to remove this game from the store?', () => {
      this.gameService.deleteGame(id).subscribe(() => {
        this.alertify.success('Game successfully deleted');
        this.router.navigate(['/games']);
      }, error => {
        this.alertify.error('Game could not be deleted');
      });
    });
  }
}
