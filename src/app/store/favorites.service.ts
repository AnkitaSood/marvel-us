import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites = signal<string[]>([])

  updateFavorites(fav: string) {
    this.favorites.mutate(value => value.push(fav));
  }
  constructor() { }
}
