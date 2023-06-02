import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterLink} from "@angular/router";
import {FavoritesService} from "../../store/favorites.service";


@Component({
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <header class="panel-header">
            <h1> My Favorites</h1>
            <button class="button button-icon" [routerLink]="['/', { outlets: { favorites : null } }]">
                <i class="material-icons">close</i>
            </button>
        </header>
        
        <ul class="panel-body">
            <li *ngFor="let fav of favorites()">{{fav}}</li>
        </ul>
        
    `,
    styles: [
        `
          @use 'tokens' as *;

          :host {
            padding: $spacing-100;
            background-color: rgba(230, 36, 41, 0.7);
            flex: 1 0 50%;
            position: sticky;
            top: 3.25rem; // height of top navigation
            height: 100dvh;

            .panel-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
            }
            
            h1 {
              font-family: 'Bangers', cursive;
              font-size: 2.5rem;
              margin-block-end: 1em;
            }
            
            .panel-body li {
              font-family: 'Comfortaa', cursive;
              
            }
          }
        `
    ]
})
export class FavoritesPanelComponent {
    favoriteService = inject(FavoritesService);
    favorites = this.favoriteService.favorites;

    constructor() {


}

}
