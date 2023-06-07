import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {ClipboardModule} from '@angular/cdk/clipboard';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-share-link',
  standalone: true,
  imports: [CommonModule, ClipboardModule],
  template: `
    <button type="button" class="button button-icon" title="share link" (click)="copyToClipboard()">
      <i class="material-icons">share</i>
    </button>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareLinkComponent {
  private clipboard = inject(Clipboard);


  copyToClipboard() {

    this.clipboard.copy(window.location.href);
  }
}
