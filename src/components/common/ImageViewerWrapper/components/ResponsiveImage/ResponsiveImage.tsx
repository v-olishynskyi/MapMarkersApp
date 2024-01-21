/**
 * @namespace ResponsiveImage
 * @category
 * @subcategory
 *  */
import React from 'react';
import { Image as NativeImage } from 'react-native';
import { ResponsiveImageProps } from './types';
import Image from 'react-native-image-progress';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

/**
 * ResponsiveImage
 *
 * @memberof
 * @param {ResponsiveImageProps} params
 *
 * @example
 * // How to use ResponsiveImage:
 *  <ResponsiveImage />
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ uri, ...rest }) => {
  const [imageSize, setImageSize] = React.useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  React.useEffect(() => {
    NativeImage.getSize(uri, (width, height) => {
      const newWidth = SCREEN_WIDTH;
      const newHeight = (height / width) * newWidth;

      setImageSize({ width: newWidth, height: newHeight });
    });
  }, [uri]);

  return (
    <Image
      source={{ uri }}
      resizeMode="contain"
      style={{ ...imageSize }}
      {...rest}
    />
  );
};

export default ResponsiveImage;
