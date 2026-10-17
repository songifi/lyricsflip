import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/musicService';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};