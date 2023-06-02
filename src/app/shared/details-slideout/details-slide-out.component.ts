import {ChangeDetectionStrategy, Component, HostBinding, inject, Input, OnInit, Signal, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarvelService} from "../../store/marvel.service";
import {Character} from "../../characters/characters.model";
import {Comic} from "../../comics/comics.model";
import {Creator} from "../../creators/creators.model";
import {combineLatest, filter, map, Observable, switchMap} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ResponseHeadingPipe} from "../pipes/response-heading.pipe";
import {ShareLinkComponent} from "../share-link/share-link.component";

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink, ResponseHeadingPipe, ShareLinkComponent],
    template: `
        <ng-container *ngIf="(response$|async) as response">
            <ng-container *ngIf="response[0] as data">
                <header class="slide-out&#45;&#45;header">
                    <h1><a [href]="data.urls[0].url" target="_blank">{{data | responseHeading }}</a></h1>
                    <div class="slide-out&#45;&#45;actions">
                        <app-share-link></app-share-link>
                        <button class="button button-icon" [routerLink]="['/', { outlets: { details : null } }]"
                                (click)="closeSlideOutPanel()">
                            <i class="material-icons">close</i>
                        </button>
                    </div>

                </header>
                <section class="slide-out&#45;&#45;content">
                    <article class="slide-out&#45;&#45;info">
                        <p>{{data.description}}</p>
                        <p *ngIf="data.comics?.available">Comics Available: {{data.comics.available}}</p>
                        <p *ngIf="data.series?.available">Series Available: {{data.series.available}}</p>
                        <p *ngIf="data.stories?.available">Stories Available: {{data.series.available}}</p>
                    </article>
                    <article class="slide-out&#45;&#45;image" *ngIf="data.thumbnail">
                        <img [src]="data.thumbnail.path + '.' + data.thumbnail.extension" alt="thumbnail">
                    </article>
                </section>
            </ng-container>
        </ng-container>

    `,
    styleUrls: ['./details-slide-out.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsSlideOutComponent {
    private marvelService = inject(MarvelService);

    id$ = this.route.params.pipe(map((params) => params['id']));
    type$ = this.route.params.pipe(map((params) => params['type']));

    constructor(private route: ActivatedRoute) {
    }

    response$ = combineLatest([
        this.type$.pipe(filter(t => t !== null)),
        this.id$.pipe(filter(i => i !== null))]).pipe(
        switchMap(([type, id]) => this.marvelService.getDetails(type, id))
    ).pipe(filter(response => !!response))

    @HostBinding('class.slide-in') slideIn = true;
    closeSlideOutPanel() {
        this.slideIn = false;
    }
}
