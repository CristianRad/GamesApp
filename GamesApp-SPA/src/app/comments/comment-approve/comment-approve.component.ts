import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { CommentForApproval } from 'src/app/_models/commentForApproval';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comment-approve',
  templateUrl: './comment-approve.component.html',
  styleUrls: ['./comment-approve.component.css']
})
export class CommentApproveComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['username', 'game', 'commentText', 'addedOn', 'operations'];
  dataSource: MatTableDataSource<CommentForApproval>;
  comments: CommentForApproval[];

  constructor(
    private alertify: AlertifyService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.loadComments();
    // document.body.classList.add('movie-list-background');
  }

  loadComments() {
    this.commentService.getCommentsForApproval().subscribe(comments => {
      this.comments = comments;
      this.dataSource = new MatTableDataSource<CommentForApproval>(this.comments);
    }, error => {
      this.alertify.error(error);
    });
  }

  approveComment(commentId: number) {
    this.commentService.approveComment(commentId).subscribe(() => {
      this.comments.splice(this.comments.findIndex(c => c.id === commentId), 1);
      this.dataSource._updateChangeSubscription();
      this.alertify.success('Comment approved');
    }, error => {
      this.alertify.error(error);
    });
  }

  rejectComment(commentId: number) {
    this.commentService.rejectComment(commentId).subscribe(() => {
      this.comments.splice(this.comments.findIndex(c => c.id === commentId), 1);
      this.dataSource.data = this.comments;
      this.alertify.success('Comment rejected');
    }, error => {
      this.alertify.error(error);
    });
  }

  ngOnDestroy() {
    // document.body.classList.remove('movie-list-background');
  }

}
