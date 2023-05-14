import { Injectable } from '@angular/core';
import {appConfig} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private readonly API_PUBLIC_KEY = appConfig.apikey;
  private readonly API_BASE_URL = appConfig.base;

  constructor() { }

  getCharacters(): Promise<any> {
    const url = `${this.API_BASE_URL}/characters?apikey=${this.API_PUBLIC_KEY}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('Characters:', data.data.results);
          return data.data.results;
        })
        .catch(error => {
          console.error('Error fetching characters:', error);
          throw error;
        });
  }

  getComics(): Promise<any> {
    const url = `${this.API_BASE_URL}/comics?apikey=${this.API_PUBLIC_KEY}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('Comics:', data.data.results);
          return data.data.results;
        })
        .catch(error => {
          console.error('Error fetching Comics:', error);
          throw error;
        });
  }

  getCreators(): Promise<any> {
    const url = `${this.API_BASE_URL}/creators?apikey=${this.API_PUBLIC_KEY}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('Creators:', data.data.results);
          return data.data.results;
        })
        .catch(error => {
          console.error('Error fetching Creators:', error);
          throw error;
        });
  }
}
