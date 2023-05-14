import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarvelService} from "../store/marvel.service";

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  constructor(private readonly marvelService: MarvelService) {
  }

  ngOnInit(): void {
    this.marvelService.getCharacters();
  }
}
