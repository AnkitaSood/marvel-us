import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarvelService} from "../store/marvel.service";
import {CardComponent} from "../shared/card/card.component";

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit{
  constructor(private readonly marvelService: MarvelService) {
  }

  ngOnInit(): void {
    this.marvelService.getComics();
  }
}
