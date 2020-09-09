import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { Comment } from 'src/app/_models/comment';
import { Game } from 'src/app/_models/game';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CommentService } from 'src/app/_services/comment.service';
import { GameService } from 'src/app/_services/game.service';
import { UserRating } from 'src/app/_models/userRating';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  game: Game;
  gameId: number;
  currentComment: Comment;
  currentUser: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  loggedUser: string;
  isUserLoggedIn = false;
  addCommentMode = false;
  updateCommentMode = false;
  gameIsPurchased = true;
  hoverIndex: number;
  ratings: number[] = [1, 2, 3, 4, 5];
  lastRatingValue: number;
  userRating: UserRating = new UserRating();

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private commentService: CommentService,
    private gameService: GameService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.game = data['game'];
    });
    this.checkIfGameIsPurchased();

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

    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.currentUser = this.authService.currentUser;
    this.getRatingValue();

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

  sendRating(rating: number) {
    const key = `${this.gameId.toString()}-${this.currentUser.id}`;
    localStorage.setItem(key, rating.toString());
    this.lastRatingValue = rating;

    this.userRating.userId = parseInt(this.authService.decodedToken.nameid, 10);
    this.userRating.gameId = this.gameId;
    this.userRating.ratingValue = rating;

    this.gameService.sendGameRating(this.gameId, this.userRating).subscribe(
      _ => {
        this.alertify.success('Rating successfully submitted');
        this.getGameDetails();
      }
    );
  }

  purchaseGame(gameId: number) {
    this.gameService.purchaseGame(gameId).subscribe(
      _ => {
        this.gameIsPurchased = true;
        this.authService.syncCurrentUser();
        this.alertify.success('Game successfully purchased');
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  checkIfGameIsPurchased() {
    this.userService.getUserPurchasedGames(parseInt(this.authService.decodedToken.nameid, 10)).subscribe(
      resp => {
        if (!resp.result.find(el => el.id === this.gameId)) {
          this.gameIsPurchased = false;
        }
      }
    );
  }

  getRatingValue() {
    const key = `${this.gameId.toString()}-${this.currentUser.id}`;
    this.lastRatingValue = parseInt(localStorage.getItem(key), 10);
    
  }

  constructEmptyArray(n: number): any[] {
    return Array(Math.round(n));
  }
}
