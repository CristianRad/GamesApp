import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Game } from 'src/app/_models/game';
import { CommentService } from 'src/app/_services/comment.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.css']
})
export class CommentUpdateComponent implements OnInit {
  @Output() submitComment = new EventEmitter();
  @Output() cancelComment = new EventEmitter();
  @Input() currentGame: Game;
  @Input() comment: any;

  updateCommentForm: FormGroup = new FormGroup({
    commentText: new FormControl('')
  });

  constructor(
    private alertify: AlertifyService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeUpdateCommentForm();
  }

  initializeUpdateCommentForm() {
    this.updateCommentForm = this.fb.group({
      id: [this.comment.commentId],
      commentText: new FormControl(this.comment.commentText)
    });
  }

  updateComment() {
    this.commentService.updateComment(this.comment.commentId, this.updateCommentForm.value).subscribe(() => {
      this.initializeUpdateCommentForm();
      this.submitComment.emit();
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelComment.emit();
  }
}
