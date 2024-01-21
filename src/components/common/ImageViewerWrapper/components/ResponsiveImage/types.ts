import { ImageProps } from 'react-native';

/**
 * @memberof ResponsiveImage
 * @typedef {Object} ResponsiveImageProps
 */
export type ResponsiveImageProps = {
  uri: string;
} & Omit<ImageProps, 'source'>;
