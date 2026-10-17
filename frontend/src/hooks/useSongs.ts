import { useQuery } from '@tanstack/react-query';
import { fetchSongs } from '../services/musicService';

export const useSongs = () => {
  return useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongs,
  });
};