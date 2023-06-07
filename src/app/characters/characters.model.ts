import {Thumbnail} from "../shared/models/common.model";

export type CharacterResponse = {
    offset: number;
    limit: number;
    total: number;
    count: number;
    type:string;
    results: Character[];
}

export type Character = {
    id: number;
    name: string;
    description: string;
    thumbnail: Thumbnail;
    comics?: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
    };
    series?: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
    };
    stories?: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
            type: string;
        }[];
    };
    events?: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
    };
    urls: {
        type: string;
        url: string;
    }[];
}
