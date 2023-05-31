import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarvelService} from "../store/marvel.service";
import {CardComponent} from "../shared/card/card.component";
import {toSignal} from "@angular/core/rxjs-interop";
import {CreatorResponse} from "./creators.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-creators',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink],
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent {
  marvelService = inject(MarvelService);
  creators = toSignal<CreatorResponse>(this.marvelService.getCreators());

}
