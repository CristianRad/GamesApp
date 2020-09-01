import { Component, OnInit, Input } from '@angular/core';

import { Game } from 'src/app/_models/game';
import { GameService } from 'src/app/_services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input() game: Game;
  @Input() isPurchased: boolean;

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  getSerialKey(gameId: number) {
    this.gameService.downloadKey(gameId).subscribe(
      response => {
        const blob = new Blob([response as BlobPart], { type: 'text/plain' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = data;
        link.download = `${this.game.title}.txt`;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function() {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      }
    );
  }

  constructEmptyArray(n: number): any[] {
    return Array(Math.round(n));
  }
}
