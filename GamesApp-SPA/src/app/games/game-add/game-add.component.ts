import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Game } from 'src/app/_models/game';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GameService } from 'src/app/_services/game.service';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {
  game: Game;
  addGameForm: FormGroup;

  constructor(
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createAddGameForm();
  }

  createAddGameForm() {
    this.addGameForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      year: [null, Validators.compose([Validators.required, Validators.min(1995)])],
      price: [null, Validators.compose([Validators.required, Validators.min(0)])],
      multiplayer:[null, Validators.required],
      photoUrl: ['', [Validators.required, Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/)]]
    });
  }

  addGame() {
    this.game = this.addGameForm.value as Game;
    this.gameService.addGame(this.game).subscribe(() => {
      this.alertify.success('Game added successfully');
      this.router.navigate(['/games']);
    }, error => {
      this.alertify.error('Adding game failed');
    });
  }

  cancel() {
    this.router.navigate(['/games']);
  }
}
