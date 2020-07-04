import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';

import { AppComponent } from './app.component';
import { CommentAddComponent } from './comments/comment-add/comment-add.component';
import { CommentApproveComponent } from './comments/comment-approve/comment-approve.component';
import { CommentUpdateComponent } from './comments/comment-update/comment-update.component';
import { GameAddComponent } from './games/game-add/game-add.component';
import { GameCardComponent } from './games/game-card/game-card.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ScreenshotEditorComponent } from './games/screenshot-editor/screenshot-editor.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { YesNoPipe } from './_pipes/yes-no.pipe';
import { GameDetailResolver } from './_resolvers/game-detail.resolver';
import { GameListResolver } from './_resolvers/game-list.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { CommentService } from './_services/comment.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { GameService } from './_services/game.service';
import { UserService } from './_services/user.service';
import { AngularMaterialModule } from './_shared/angular-material.module';
import { appRoutes } from './routes';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      CommentAddComponent,
      CommentApproveComponent,
      CommentUpdateComponent,
      GameAddComponent,
      GameCardComponent,
      GameDetailComponent,
      GameEditComponent,
      GameListComponent,
      HasRoleDirective,
      HomeComponent,
      NavComponent,
      RegisterComponent,
      ScreenshotEditorComponent,
      UserEditComponent,
      YesNoPipe
   ],
   imports: [
      AngularMaterialModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      TimeagoModule.forRoot(),
      MatTableModule,
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   exports: [
      AngularMaterialModule
   ],
   providers: [
      AlertifyService,
      AuthGuard,
      AuthService,
      CommentService,
      ErrorInterceptorProvider,
      GameDetailResolver,
      GameListResolver,
      GameService,
      PreventUnsavedChanges,
      UserEditResolver,
      UserService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
