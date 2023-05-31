import {ChangeDetectionStrategy, Component, ContentChild, inject, Input, NgIterable, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {Comic} from "../../comics/comics.model";
import {Character} from "../../characters/characters.model";
import {Creator} from "../../creators/creators.model";
import {FavoritesService} from "../../store/favorites.service";
import {ResponseHeadingPipe} from "../pipes/response-heading.pipe";

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule, ResponseHeadingPipe],
    host: {class: 'layout-cards'},
    template: `
        <ng-container *ngIf="response">
            <article class="card" *ngFor="let data  of response">
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
                    <button type="button" class="button" (click)="openFavPanel(name)">Add to Favorites
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
              justify-content: center;
              gap: $spacing-100;
              padding: $spacing-100;
            }

            .card {
              display: block;
              width: $size-card-width;
              padding: $spacing-50;
              border: $size-border-1px dotted $color-card-border;
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
              font-size: $font-base;
              overflow: hidden;
              margin-bottom: $spacing-50;
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

    openFavPanel(name: string) {
        this.favoriteService.updateFavorites(name);
        this.router.navigate([{outlets: {favorites: ['my-favorites']}}], {skipLocationChange: true});
    }
}
