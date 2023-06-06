import {ChangeDetectionStrategy, Component, ContentChild, inject, Input, NgIterable, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {Comic} from "../../comics/comics.model";
import {Character} from "../../characters/characters.model";
import {Creator} from "../../creators/creators.model";
import {FavoritesService} from "../../store/favorites.service";
import {ResponseHeadingPipe} from "../pipes/response-heading.pipe";
import {Thumbnail} from "../models/common.model";

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [CommonModule, ResponseHeadingPipe],
    host: {class: 'layout-cards'},
    template: `
        <ng-container *ngIf="response">
            <article class="card" *ngFor="let data  of response; trackBy: response.id">
                <img class="thumbnail" [src]="data.thumbnail.path + '.' + data.thumbnail.extension" alt="thumbnail">
                <h3 class="card-title">
                    <ng-container
                            *ngTemplateOutlet="header || defaultHeaderTmpl; context: {$implicit: data}"></ng-container>
                </h3>
                <p class="card-body">
                    <ng-container
                            *ngTemplateOutlet="body || defaultBodyTmpl; context: {$implicit: data}"></ng-container>
                </p>
                <ng-container *ngIf="(data | responseHeading) as name">
                    <button type="button" class="button card-btn" (click)="openFavPanel(name, data.thumbnail)">Add to Favorites
                    </button>
                </ng-container>
            </article>
        </ng-container>
        <ng-template #defaultHeaderTmpl>Header content not available.</ng-template>
        <ng-template #defaultBodyTmpl>Body content not available.</ng-template>

    `,
    styles: [
        `
          @use 'tokens' as *;

          :host {

            &.layout-cards {
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;
              gap: $spacing-100;
              padding: $spacing-100;
            }

            .card {
              display: flex;
              flex-direction: column;
              gap: $spacing-50;
              width: $size-card-width;
              padding: $spacing-100;
              background-color: $color-card-background;
            }

            .thumbnail {
              width: 100%;
              height: $size-card-img-height;
              object-fit: contain;
            }

            .card-title {
              font-size: $font-header-card;
              margin-bottom: $spacing-50;
            }
            
            .card-body {
              -webkit-line-clamp: 3;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              font-size: $font-size-base;
              overflow: hidden;
              margin-bottom: $spacing-100;
            }
            
            .card-btn {
              margin-top: auto;
              box-shadow: -3px 3px 0px 0px #ffffff, 0 5px 5px -2px #ffffff;
            }
          }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardComponent {
    @Input({required: true}) response: Character[] | Comic[] | Creator[] | undefined;
    @ContentChild('header') header: TemplateRef<any> | undefined;
    @ContentChild('body') body: TemplateRef<any> | undefined;
    favoriteService = inject(FavoritesService);
    constructor(private readonly router: Router) {
    }

    openFavPanel(name: string, thumbnail: Thumbnail) {
        this.favoriteService.updateFavorites(name, thumbnail);
        this.router.navigate([{outlets: {favorites: ['my-favorites']}}], {skipLocationChange: true});
    }
}
