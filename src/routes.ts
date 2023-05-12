import {Route} from "@angular/router";
import {CharactersComponent} from "./app/characters/characters.component";
import {ComicsComponent} from "./app/comics/comics.component";
import {CreatorsComponent} from "./app/creators/creators.component";

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
    { path: '', pathMatch: 'full', redirectTo: 'characters' },
    { path: '**', redirectTo: '/' },
];
