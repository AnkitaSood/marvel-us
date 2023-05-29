import {ChangeDetectionStrategy, Component, ContentChild, Input, NgIterable, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {Comic} from "../../comics/comics.model";
import {Character} from "../../characters/characters.model";
import {Creator} from "../../creators/creators.model";

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    host: {class: 'layout-cards'},
    template: `
        <article class="card" *ngFor="let data  of response">
            <img class="thumbnail" [src]="data.thumbnail.path + '.' + data.thumbnail.extension" alt="thumbnail">
            <h3 class="card-title">
                <ng-container
                        *ngTemplateOutlet="header || defaultHeaderTmpl; context: {$implicit: data}"></ng-container>
            </h3>
            <p class="card-body">
                <ng-container *ngTemplateOutlet="body || defaultBodyTmpl; context: {$implicit: data}"></ng-container>
            </p>

            <button type="button" (click)="openFavPanel(data.id)">Add to Favorites</button>
        </article>
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
          }

        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardComponent {
    @Input({required: true}) response:  Character[] | Comic[] | Creator[] | undefined;
    @ContentChild('header') header: TemplateRef<any> | undefined;
    @ContentChild('body') body: TemplateRef<any> | undefined;


    constructor(private readonly router: Router) {
    }

    openFavPanel(id: number) {
        console.log(id);
        this.router.navigate([{outlets: {favorites: ['my-favorites']}}], {skipLocationChange: true});
    }
}
