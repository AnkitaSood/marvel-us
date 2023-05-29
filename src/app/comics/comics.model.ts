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
    prices: [
        {
            type: string,
            price: number
        },
    ];
    thumbnail: Thumbnail;
    creators: {
        "available": number;
        "collectionURI": string;
        "items": [
            {
                "resourceURI": string;
                "name": string;
                role: string;
            }
        ],
    }
}

type Thumbnail = {
    path: string;
    extension: string;
}