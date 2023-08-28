import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { Dimensions } from 'react-native';

/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

/**
 * Returns true of the screen is in landscape mode
 */
export const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

export const ASPECT_RATIO = WINDOW_WIDTH / WINDOW_HEIGHT;
