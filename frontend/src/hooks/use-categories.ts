import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/apiClient';

export interface Category {
  id: string;
  name: string;
  slug?: string;
  songCount?: number;
}

interface GenresResponse {
  genres?: Array<string | Category>;
  data?: Array<string | Category>;
}

const normalizeCategory = (raw: string | Category): Category => {
  if (typeof raw === 'string') {
    return { id: raw, name: raw, slug: raw };
  }
  const name = raw.name ?? raw.id;
  return {
    id: raw.id ?? name,
    name,
    slug: raw.slug ?? name,
    songCount: raw.songCount,
  };
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<GenresResponse | Array<string | Category>>(
    '/songs/genres',
  );

  const payload = response.data;
  const rawList: Array<string | Category> = Array.isArray(payload)
    ? payload
    : payload?.genres ?? payload?.data ?? [];

  return rawList.map(normalizeCategory);
};

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};