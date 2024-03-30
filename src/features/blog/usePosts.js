import { useFilteredAndSortedData } from '../../hooks/useFilterData';
import { filterIdenticalObjects } from '../../utils/helpers/filterIdenticalObjectsOut';
import { filterFn, sortSwitchFn } from './blogFilterNSort';
import { useRawPosts } from './useRawPosts';

export function usePosts() {
  const { posts: data = [], isLoading, error } = useRawPosts();
  const autori = data
    ? filterIdenticalObjects(data.map((post) => post.autori))
    : [];

  const filteredPosts = useFilteredAndSortedData({
    data: [...data],
    sortSwitchFn: sortSwitchFn,
    filterBy: 'filterAuthors',
    filterFn: filterFn,
    searchByKey: 'titolo',
  });

  return { posts: filteredPosts, autori, isLoading, error };
}
