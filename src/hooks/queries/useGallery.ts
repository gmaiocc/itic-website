// React Query hook for fetching gallery photos
import { useQuery } from '@tanstack/react-query';
import { galleryApi } from '@/api/gallery';

export const useGallery = () => {
    return useQuery({
        queryKey: ['gallery'],
        queryFn: () => galleryApi.getPhotos(),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

export const useGalleryPhoto = (id: string) => {
    return useQuery({
        queryKey: ['gallery', id],
        queryFn: () => galleryApi.getPhoto(id),
        enabled: !!id,
    });
};
