import {Route} from "@angular/router";
import {CharactersListComponent} from "./app/characters/characters-list.component";

export const routes: Route[] = [
    {
        path: 'characters',
        component: CharactersListComponent
    },
    { path: '', pathMatch: 'full', redirectTo: 'characters' },
    { path: '**', redirectTo: '/' },
];
