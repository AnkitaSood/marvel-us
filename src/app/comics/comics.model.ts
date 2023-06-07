import {Thumbnail} from "../shared/models/common.model";

export type ComicsResponse = {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comic[];
}

export type Comic = {
    id: number;
    title: string;
    description: string;
    format: string;
    prices: [
        {
            type: string,
            price: number
        },
    ];
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
