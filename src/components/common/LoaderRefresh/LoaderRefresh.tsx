/**
 * @namespace LoaderRefresh
 * @category Components
 * @subcategory Shared
 *  */

import React from 'react';
import { RefreshControl } from 'react-native';
import { LoaderRefreshProps } from './types';
import { getTheme } from '@utils/helpers';

/**
 *
 * LoaderRefresh component.
 *
 * @memberof SharedComponents
 * @example
 *  <LoaderRefresh
 *    isRefreshing={isRefreshing}
 *    onRefresh={() => {
 *      // do some stuff
 *    }}
 *  />
 *
 */
const LoaderRefresh: React.FC<LoaderRefreshProps> = ({
  isRefreshing,
  onRefresh,
}) => {
  const { colors } = getTheme();

  return (
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      title={!isRefreshing ? 'Потягніть для оновлення' : ''}
      tintColor={colors.black} // Change color by THEME
      titleColor={colors.black} // Change color by THEME
    />
  );
};

export default LoaderRefresh;