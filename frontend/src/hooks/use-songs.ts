import { useQuery } from '@tanstack/react-query';
import { fetchSongs } from '../mock/musicService';

export const useSongs = () => {
  return useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongs,
  });
};