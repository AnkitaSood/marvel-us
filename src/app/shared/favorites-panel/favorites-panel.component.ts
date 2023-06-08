import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterLink} from "@angular/router";
import {FavoritesService} from "../../store/favorites.service";
import {CdkDrag, CdkDragDrop, CdkDragPreview, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink, CdkDrag, CdkDropList, CdkDragPreview],
    template: `
        <header class="panel-header">
            <h1> My Favorites</h1>
            <button class="button button-icon" [routerLink]="['/', { outlets: { favorites : null } }]">
                <i class="material-icons">close</i>
            </button>
        </header>
        <ul cdkDropList (cdkDropListDropped)="drop($event)" class="panel-body">
            <li *ngFor="let fav of favorites()" cdkDrag>
                {{fav.name}}
                <img *cdkDragPreview [src]="fav.thumbnail.path+ '.' + fav.thumbnail.extension" [alt]="fav.name">
            </li>
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
              font-size: 4rem;
              margin-block-end: 0.5em;
            }

            .panel-body li {
              font-family: 'Comfortaa', cursive;
              list-style-type: none;
              font-size: 1.5rem;
              margin-bottom: 1rem;

              &:hover {
                cursor: pointer;
                text-shadow: $color-text-secondary 0.0625rem 0 0.625rem;
              }

              &:before {
                font-family: 'Material Icons';
                content: 'electric_bolt';
                color: $color-text-secondary;
                vertical-align: middle;
              }
            }
          }
        `
    ]
})
export class FavoritesPanelComponent {
    favoriteService = inject(FavoritesService);
    favorites = this.favoriteService.favorites;

    constructor() {}

    drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
        moveItemInArray(this.favorites(), event.previousIndex, event.currentIndex);
    }

}
