import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarvelService} from "../store/marvel.service";
import {CardComponent} from "../shared/card/card.component";
import {CharacterResponse} from "./characters.model";
import {toSignal} from "@angular/core/rxjs-interop";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent  {

  marvelService = inject(MarvelService);
  characters  = toSignal(this.marvelService.getCharacters());

constructor() {
}
}
