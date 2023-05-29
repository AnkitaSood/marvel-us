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
}

type Thumbnail = {
    path: string;
    extension: string;
}
