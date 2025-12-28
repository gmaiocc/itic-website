// Gallery and team photo types

export interface GalleryPhoto {
    id?: string;
    image: string;
    title: string;
    description: string;
    date?: string;
    category?: string;
    thumbnail?: string;
}

export interface GalleryResponse {
    photos: GalleryPhoto[];
    total: number;
}
