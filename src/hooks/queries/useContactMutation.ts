// React Query mutation hook for contact form submission
import { useMutation } from '@tanstack/react-query';
import { contactApi } from '@/api/contact';
import type { ContactFormData } from '@/types/contact';

export const useContactMutation = () => {
    return useMutation({
        mutationFn: (data: ContactFormData) => contactApi.submitContact(data),
        onSuccess: () => {
            // Could add additional side effects here, like analytics tracking
            console.log('Contact form submitted successfully');
        },
        onError: (error) => {
            console.error('Failed to submit contact form:', error);
        },
    });
};
