/**
 * @namespace StatusBar
 * @category Component
 * @subcategory Layout component
 *  */
import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { useStores } from '@store';
import { getTheme } from '@common/helpers';

/**
 * StatusBar
 *
 * @memberof Components
 *
 * @example
 * // How to use StatusBar:
 *  <StatusBar />
 */
const StatusBar: React.FC = () => {
  const {
    uiStore: { isDark },
  } = useStores();
  const { colors } = getTheme();

  const bgColor = colors.background;

  return (
    <RNStatusBar
      animated
      backgroundColor={bgColor}
      barStyle={isDark ? 'light-content' : 'dark-content'}
    />
  );
};

export default StatusBar;
