import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../mock/musicService';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};