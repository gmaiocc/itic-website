// React Query hook for fetching reports
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { ReportFilters, ReportsResponse, Report } from '@/types/report';

export const useReports = (filters?: ReportFilters) => {
    return useQuery({
        queryKey: ['reports', filters],
        queryFn: async (): Promise<ReportsResponse> => {
            let query = supabase
                .from('reports')
                .select('*')
                .order('created_at', { ascending: false });

            if (filters?.category) {
                query = query.eq('category', filters.category);
            }

            if (filters?.search) {
                query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
            }

            const { data, error } = await query;

            if (error) throw error;

            return { reports: data || [], total: data?.length || 0 };
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useReport = (id: string) => {
    return useQuery({
        queryKey: ['reports', id],
        queryFn: async (): Promise<Report> => {
            const { data, error } = await supabase
                .from('reports')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        },
        enabled: !!id,
    });
};
