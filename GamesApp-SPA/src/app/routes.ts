import { Routes } from '@angular/router';

import { CommentsComponent } from './comments/comments.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { GameDetailResolver } from './_resolvers/game-detail.resolver';
import { GameListResolver } from './_resolvers/game-list.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'games', component: GameListComponent, resolve: { games: GameListResolver } },
            { path: 'games/:id', component: GameDetailComponent,
                resolve: { game: GameDetailResolver } },
            { path: 'games/:id/edit', component: GameEditComponent,
                resolve: { game: GameDetailResolver } },
            { path: 'user/edit', component: UserEditComponent,
                resolve: { user: UserEditResolver }, canDeactivate: [PreventUnsavedChanges] },
            { path: 'comments', component: CommentsComponent },
            { path: 'lists', component: ListsComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
