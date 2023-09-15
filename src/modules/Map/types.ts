import { MapViewProps } from 'react-native-maps';

/**
 * @memberof Map
 * @typedef {Object} MapProps
 */
export type MapProps = Omit<
  MapViewProps,
  'tintColor' | 'showUserLocation' | 'followsUserLocation'
>;
