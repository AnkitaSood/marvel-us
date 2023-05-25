export type CharacterResponse = {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
}

export type Character = {
    id: number;
    name: string;
    description: string;
    thumbnail: Thumbnail;
    comics: {
        available: number;
    }
    // Include other properties as needed
}

export type Thumbnail = {
    path: string;
    extension: string;
}
