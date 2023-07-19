import { FlatListProps } from 'react-native';

/**
 * @memberof BaseList
 * @typedef {Object} BaseListProps
 */
export type BaseListProps = Omit<
  FlatListProps<any>,
  'onEndReached' | 'onRefresh' | 'refreshing'
> & {
  isLoading: boolean;
  onRefresh: VoidFunction;
  onEndReached?: VoidFunction;
  isFetchingNextPage?: boolean;
  enableRefresh?: boolean;
};
