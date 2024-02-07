import { ListRenderItem } from 'react-native';

/**
 * @memberof CommunityList
 * @typedef {Object} CommunityListProps
 */
export type CommunityListProps<T> = {
  data: Array<any>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  refetch: VoidFunction;
  hasNextPage: boolean;
  fetchNextPage: VoidFunction;
  renderItem: ListRenderItem<T>;
};
