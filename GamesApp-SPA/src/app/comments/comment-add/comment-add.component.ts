import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Comment } from 'src/app/_models/comment';
import { Game } from 'src/app/_models/game';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GameService } from 'src/app/_services/game.service';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent {
  @Output() submitComment = new EventEmitter();
  @Output() cancelComment = new EventEmitter();
  @Input() currentGame: Game;

  addCommentForm: FormGroup = new FormGroup({
    commentText: new FormControl('')
  });

  constructor(
    private gameService: GameService,
    private alertify: AlertifyService
  ) { }

  saveComment() {
    const newComment = this.addCommentForm.value as Comment;
    this.gameService.addComment(this.currentGame.id, newComment).subscribe(() => {
      this.alertify.success('Comment waiting for approval');
      this.submitComment.emit();
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelComment.emit();
  }
}
