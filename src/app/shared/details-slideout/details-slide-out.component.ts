import {ChangeDetectionStrategy, Component, HostBinding, inject, Input, OnInit, Signal, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarvelService} from "../../store/marvel.service";
import {toSignal} from "@angular/core/rxjs-interop";
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
        <ng-container *ngIf="(response$ | async)[0]  as response">
            <header class="slide-out--header">
                <h1><a [href]="response.urls[0].url" target="_blank">{{response | responseHeading }}</a></h1>
                <div class="slide-out--actions">
                    <button class="button button-icon" [routerLink]="['/', { outlets: { details : null } }]"
                            (click)="closeSlideOutPanel()">
                        <i class="material-icons">close</i>
                    </button>
                    <app-share-link></app-share-link>
                </div>

            </header>
            <section class="slide-out--content">
                <article class="slide-out--info">
                    <p>{{response.description}}</p>
                    <p *ngIf="response.comics?.available">Comics Available: {{response.comics.available}}</p>
                    <p *ngIf="response.series?.available">Series Available: {{response.series.available}}</p>
                    <p *ngIf="response.stories?.available">Stories Available: {{response.series.available}}</p>
                </article>
                <article class="slide-out--image" *ngIf="response.thumbnail">
                    <img [src]="response.thumbnail.path + '.' + response.thumbnail.extension" alt="thumbnail">
                </article>
            </section>
        </ng-container>
    `,
    styleUrls: ['./details-slide-out.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsSlideOutComponent implements OnInit{
    constructor(private route: ActivatedRoute) {
    }
    private marvelService = inject(MarvelService);
   /* idSig = signal('');
    typeSig = signal('');*/
    /*@Input({required: true}) set id(id: string) {
        this.idSig.set(id);
    };
    @Input({required: true}) set type(type: string) {
        this.typeSig.set(type);
    };*/

    id$ = this.route.params.pipe(map((params) => params['id']));
    type$ = this.route.params.pipe(map((params) => params['type']));

    response$ = combineLatest([
        this.type$.pipe(filter(t => t !== null)),
    this.id$.pipe(filter(i => i !== null))]).pipe(
        switchMap(([type,id]) => this.marvelService.getDetails(type, id))
    )

    @HostBinding('class.slide-in') slideIn = true;

    // response$!: Observable<Character | Comic | Creator | undefined>;


    ngOnInit(): void {
        // this.response$ = this.marvelService.getDetails(this.typeSig(), this.idSig());
        // this.response$ = this.marvelService.getDetails(this.typeSig(), this.idSig());
    }


    closeSlideOutPanel() {
        this.slideIn = false;
    }
}
