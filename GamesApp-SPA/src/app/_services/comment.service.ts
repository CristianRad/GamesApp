import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Comment } from '../_models/comment';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateComment(commentId: number, comment: Comment) {
    return this.http.put(this.baseUrl + 'comments/' + commentId, comment);
  }

  deleteComment(commentId: number) {
    return this.http.delete(this.baseUrl + 'comments/' + commentId);
  }

  approveComment(commentId: number) {
    return this.http.post(this.baseUrl + 'comments/approve/' + commentId, {});
  }

  rejectComment(commentId: number) {
    return this.http.post(this.baseUrl + 'comments/reject/' + commentId, {});
  }

  getCommentsForApproval() {
    return this.http.get(this.baseUrl + 'comments');
  }
}
