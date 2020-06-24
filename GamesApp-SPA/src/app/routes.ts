import { Routes } from '@angular/router';

import { CommentsComponent } from './comments/comments.component';
import { HomeComponent } from './home/home.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { GameDetailResolver } from './_resolvers/game-detail.resolver';
import { GameListResolver } from './_resolvers/game-list.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'games', component: GameListComponent, resolve: { games: GameListResolver } },
            { path: 'games/:id', component: GameDetailComponent, resolve: { game: GameDetailResolver } },
            { path: 'comments', component: CommentsComponent },
            { path: 'lists', component: ListsComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
