import {Injectable} from '@angular/core';
import {appConfig} from "../../config";
import {Observable} from "rxjs";
import {CharacterResponse} from "../characters/characters.model";
import {ComicsResponse} from "../comics/comics.model";
import {CreatorResponse} from "../creators/creators.model";

@Injectable({
    providedIn: 'root'
})
export class MarvelService {
    private readonly API_PUBLIC_KEY = appConfig.apikey;
    private readonly API_BASE_URL = appConfig.base;

  constructor() { }

    getCharacters(): Observable<CharacterResponse> {
        const url = `${this.API_BASE_URL}/characters?modifiedSince=2020-01-01T00%3A00%3A00-0000&orderBy=name%2Cmodified&limit=16&apikey=${this.API_PUBLIC_KEY}`;
        return new Observable((observer) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    observer.next(data.data);
                    observer.complete();
                })
                .catch(error => {
                    console.error('Error fetching characters:', error);
                    observer.error(error);
                });
        })
    }

    getComics(): Observable<ComicsResponse> {
        const url = `${this.API_BASE_URL}/comics?orderBy=title&limit=16&apikey=${this.API_PUBLIC_KEY}`;

        return new Observable((observer) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    observer.next(data.data);
                    observer.complete();
                })
                .catch(error => {
                    console.error('Error fetching Comics:', error);
                    throw error;
                });
        })
    }

    getCreators(): Observable<CreatorResponse> {
        const url = `${this.API_BASE_URL}/creators?limit=16&apikey=${this.API_PUBLIC_KEY}`;

        return new Observable((observer) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    observer.next(data.data);
                    observer.complete()
                })
                .catch(error => {
                    console.log('Error fetching Creators:', error);
                    throw error;
                })
        })
    }
}
