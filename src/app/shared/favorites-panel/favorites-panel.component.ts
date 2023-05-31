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
        
        <section class="panel-body">
            <p *ngFor="let fav of favorites()">{{fav}}</p>
        </section>
        
    `,
    styles: [
        `
          @use 'tokens' as *;

          :host {
            padding: $spacing-100;
            background-color: deeppink;
            flex: 1 0 50%;

            .panel-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
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
