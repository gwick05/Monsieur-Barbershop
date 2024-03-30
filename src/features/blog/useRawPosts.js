import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../services/apiBlog';

export function useRawPosts() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
  return { posts, isLoading, error };
}
