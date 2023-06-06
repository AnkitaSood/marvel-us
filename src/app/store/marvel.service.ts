import {Injectable} from '@angular/core';
import {appConfig} from "../../config";
import {Observable} from "rxjs";
import {Character, CharacterResponse} from "../characters/characters.model";
import {Comic, ComicsResponse} from "../comics/comics.model";
import {Creator, CreatorResponse} from "../creators/creators.model";

@Injectable({
    providedIn: 'root'
})
export class MarvelService {
    private readonly API_PUBLIC_KEY = appConfig.apikey;
    private readonly API_BASE_URL = appConfig.base;
    private readonly API_PRIVATE_KEY = appConfig.privateKey;

    constructor() {
    }

    getCharacters(): Observable<CharacterResponse> {
        const url = `${this.API_BASE_URL}/characters?nameStartsWith=spider&orderBy=-name&apikey=${this.API_PUBLIC_KEY}`;
        return new Observable((observer) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const characterData: CharacterResponse = {...data.data, type: "characters"}
                    observer.next(characterData);
                    observer.complete();
                })
                .catch(error => {
                    console.error('Error fetching characters:', error);
                    observer.error(error);
                });
        })
    }

    getComics(): Observable<ComicsResponse> {
        const url = `${this.API_BASE_URL}/comics?titleStartsWith=spider&&apikey=${this.API_PUBLIC_KEY}`;

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
        const url = `${this.API_BASE_URL}/creators?comics=21839%2C%2098392%2C%20108352%2C%20107476%2C%20%20108351%2C%2099751%2C%20106158%2C%20107477%2C%20106157%2C102817&apikey=${this.API_PUBLIC_KEY}`;

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

    getDetails(type: string, id: string): Observable<Character | Comic | Creator> {

        const url = `${this.API_BASE_URL}/${type}/${id}?apikey=${this.API_PUBLIC_KEY}`;
        return new Observable((observer) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    observer.next(data.data.results);
                    observer.complete()
                })
                .catch(error => {
                    console.log("Error displaying details", error);
                    throw error;
                })
        })
    }
}
