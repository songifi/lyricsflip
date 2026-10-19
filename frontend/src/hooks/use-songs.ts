import { useQuery } from '@tanstack/react-query';
import { fetchSongs } from '../services/music-service';

export const useSongs = () => {
  return useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongs,
  });
};