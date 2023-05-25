import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarvelService} from "../store/marvel.service";
import {CardComponent} from "../shared/card/card.component";
import {CharacterResponse} from "./characters.model";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  host: {class:'layout-cards'}
})
export class CharactersComponent  {

  marvelService = inject(MarvelService);
  characters  = toSignal<CharacterResponse>(this.marvelService.getCharacters());

  constructor() {}
}
