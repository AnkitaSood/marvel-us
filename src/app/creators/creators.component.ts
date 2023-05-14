import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarvelService} from "../store/marvel.service";

@Component({
  selector: 'app-creators',
  standalone: true,
  imports: [CommonModule],
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
