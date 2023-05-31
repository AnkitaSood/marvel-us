import {Thumbnail} from "../shared/models/common.model";

export type CreatorResponse = {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Creator[];
}

export type Creator = {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    fullName: string;
    modified: string; // Date string in ISO 8601 format
    thumbnail?: Thumbnail;
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
