import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/music-service';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};