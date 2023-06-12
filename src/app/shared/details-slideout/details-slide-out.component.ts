import {ChangeDetectionStrategy, Component, HostBinding, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarvelService} from "../../store/marvel.service";
import { filter, map, switchMap} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ResponseHeadingPipe} from "../pipes/response-heading.pipe";
import {ShareLinkComponent} from "../share-link/share-link.component";

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink, ResponseHeadingPipe, ShareLinkComponent],
    template: `
        <ng-container *ngIf="(response$|async) as response">
            <ng-container *ngIf="response[0] as data">
                <header class="slide-out--header">
                    <h2 class="slide-out--title"><a [href]="data.urls[0].url"
                                                    target="_blank">{{data | responseHeading }}</a></h2>
                    <div class="slide-out&#45;&#45;actions">
                        <app-share-link></app-share-link>
                        <button class="button button-icon" title="Close"
                                [routerLink]="['/', { outlets: { details : null } }]"
                                (click)="closeSlideOutPanel()">
                            <i class="material-icons">close</i>
                        </button>
                    </div>

                </header>
                <section class="slide-out--content">
                    <article class="slide-out--info">
                        <p>{{data.description}}</p>
                        <p *ngIf="data.comics?.available">Comics Available: {{data.comics.available}}</p>
                        <p *ngIf="data.series?.available">Series Available: {{data.series.available}}</p>
                        <p *ngIf="data.stories?.available">Stories Available: {{data.stories.available}}</p>
                        <p *ngIf="data.events?.available">Events Available: {{data.events.available}}</p>

                        <p class="slide-out--links-container" *ngIf="data.urls"><span>Links: </span>
                            <ng-container *ngFor="let url of data.urls; last as isLast">
                                <a class="slide-out--link" [ngClass]="{'slide-out--link-last': isLast}" [href]="url.url"
                                   target="_blank">{{url.type | titlecase }} <i class="material-icons">open_in_new</i>
                                </a>
                            </ng-container>
                        </p>
                    </article>
                    <img *ngIf="data.thumbnail" class="slide-out--image"
                         [src]="data.thumbnail.path + '.' + data.thumbnail.extension" alt="thumbnail">
                </section>
            </ng-container>
        </ng-container>

    `,
    styleUrls: ['./details-slide-out.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsSlideOutComponent {
    private marvelService = inject(MarvelService);

    constructor(private route: ActivatedRoute) {
    }

    response$ = this.route.params.pipe(
        map((params) => {
            return {
                id: params['id'],
                type: params['type']
            }
        }),
        filter(({ id, type }) => !!id && !!type),
        switchMap(({ id, type }) => {
            return this.marvelService.getDetails(type, id).pipe(
                filter(response => !!response)
            )
        })
    )

    @HostBinding('class.slide-in') slideIn = true;
    closeSlideOutPanel() {
        this.slideIn = false;
    }
}
