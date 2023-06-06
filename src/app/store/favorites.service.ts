import {Injectable, signal} from '@angular/core';
import {Favorite, Thumbnail} from "../shared/models/common.model";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites = signal<Favorite[]>([])

  updateFavorites(name: string, thumbnail: Thumbnail) {
    this.favorites.mutate(value => value.push({name, thumbnail}));
  }
  constructor() { }
}
