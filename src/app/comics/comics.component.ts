import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarvelService} from "../store/marvel.service";
import {CardComponent} from "../shared/card/card.component";
import {toSignal} from "@angular/core/rxjs-interop";
import {ComicsResponse} from "./comics.model";

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent {
  marvelService = inject(MarvelService);
  comics = toSignal<ComicsResponse>(this.marvelService.getComics());

  constructor() {}

}
