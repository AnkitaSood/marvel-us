import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarvelService} from "../store/marvel.service";
import {CardComponent} from "../shared/card/card.component";

@Component({
  selector: 'app-creators',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {
  constructor(private readonly marvelService: MarvelService) {
  }

  ngOnInit(): void {
    this.marvelService.getCreators();
  }
}
