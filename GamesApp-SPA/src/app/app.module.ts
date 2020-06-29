import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FileUploadModule } from 'ng2-file-upload';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { GameCardComponent } from './games/game-card/game-card.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ScreenshotEditorComponent } from './games/screenshot-editor/screenshot-editor.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { GameService } from './_services/game.service';
import { UserService } from './_services/user.service';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { GameDetailResolver } from './_resolvers/game-detail.resolver';
import { GameListResolver } from './_resolvers/game-list.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      CommentsComponent,
      GameCardComponent,
      GameDetailComponent,
      GameEditComponent,
      GameListComponent,
      HomeComponent,
      ListsComponent,
      NavComponent,
      RegisterComponent,
      ScreenshotEditorComponent,
      UserEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
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
   providers: [
      AlertifyService,
      AuthGuard,
      AuthService,
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
