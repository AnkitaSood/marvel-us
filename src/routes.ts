import {Route} from "@angular/router";
import {CharactersComponent} from "./app/characters/characters.component";
import {ComicsComponent} from "./app/comics/comics.component";
import {CreatorsComponent} from "./app/creators/creators.component";
import {FavoritesPanelComponent} from "./app/shared/favorites-panel/favorites-panel.component";

export const routes: Route[] = [
    {
        path: 'characters',
        component: CharactersComponent
    },
    {
        path: 'comics',
        component: ComicsComponent
    },
    {
        path: 'creators',
        component: CreatorsComponent
    },
    {
        path: 'my-favorites',
        outlet: 'favorites',
        loadComponent: () => import('./app/shared/favorites-panel/favorites-panel.component').then(m => FavoritesPanelComponent)
    },
    {path: '', pathMatch: 'full', redirectTo: 'characters'},
    {path: '**', redirectTo: '/characters'},
];
