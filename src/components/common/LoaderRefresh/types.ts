import { RefreshControlProps } from 'react-native';

/**
 * @memberof LoaderRefresh
 * @typedef {Object} LoaderRefreshProps
 */
export type LoaderRefreshProps = {
  isRefreshing: boolean;
  onRefresh?: () => void;
} & Omit<RefreshControlProps, 'refreshing' | 'onRefresh'>;
