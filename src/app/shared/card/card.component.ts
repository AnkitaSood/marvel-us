import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <img [src]="image" alt="main photo">
        <h3>
            <ng-content select="[name]"></ng-content>
        </h3>
        <p>
            <ng-content select="[description]"></ng-content>
        </p>
    `,
    styles: [
        `
          @use 'tokens' as *;
          
          :host {
            display: block;
            width: $size-card-width;
            padding: $spacing-50;
            border: $size-border-1px dotted aliceblue;


            img {
              width: 100%;
              height: auto;
              object-fit: contain;
            }

            h3 {
              font-size: $font-header-card;
              margin-bottom:$spacing-50;
            }

          }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
    @Input({required: true}) image: string ='';
}
