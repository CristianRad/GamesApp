import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { Comment } from 'src/app/_models/comment';
import { Game } from 'src/app/_models/game';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CommentService } from 'src/app/_services/comment.service';
import { GameService } from 'src/app/_services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  game: Game;
  currentComment: Comment;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  loggedUser: string;
  isUserLoggedIn = false;
  addCommentMode = false;
  updateCommentMode = false;

  constructor(
    private commentService: CommentService,
    private gameService: GameService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.game = data['game'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();

    this.isUserLoggedIn = this.authService.loggedIn();
    if (this.isUserLoggedIn) {
      this.loggedUser = this.authService.decodedToken.unique_name;
    }
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.game.screenshots) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      });
    }
    return imageUrls;
  }

  toggleAddCommentForm() {
    this.updateCommentMode = false;
    this.addCommentMode = !this.addCommentMode;
    this.selectTab();
  }

  selectTab() {
    this.staticTabs.tabs[2].active = true;
  }

  closeAddForm() {
    this.addCommentMode = false;
  }

  toggleUpdateCommentForm(comment: Comment) {
    this.currentComment = comment;
    this.addCommentMode = false;
    this.updateCommentMode = !this.updateCommentMode;
  }

  closeUpdateForm() {
    this.updateCommentMode = false;
  }

  deleteComment(commentId: number) {
    this.updateCommentMode = false;
    this.alertify.confirm('Are you sure you want to delete this comment?', () => {
      this.commentService.deleteComment(commentId).subscribe(() => {
        this.alertify.success('Comment successfully deleted');
        this.getGameDetails();
      }, error => {
        this.alertify.error(error);
      });
    });
  }

  reloadData() {
    this.updateCommentMode = false;
    this.getGameDetails();
  }

  getGameDetails() {
    this.gameService.getGame(this.game.id).subscribe(game => this.game = game);
  }
}
