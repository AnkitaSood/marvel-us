// import { MD5 } from 'crypto-js';
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
        const url = `${this.API_BASE_URL}/characters?modifiedSince=2010-01-01T00%3A00%3A00-0000&orderBy=name%2Cmodified&limit=20&apikey=${this.API_PUBLIC_KEY}`;
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
        const url = `${this.API_BASE_URL}/comics?orderBy=title&limit=20&apikey=${this.API_PUBLIC_KEY}`;

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
        const url = `${this.API_BASE_URL}/creators?modifiedSince=2010-01-01T00%3A00%3A00-0000&limit=20&apikey=${this.API_PUBLIC_KEY}`;

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
