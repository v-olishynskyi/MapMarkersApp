/**
 * @namespace ResponsiveImage
 * @category
 * @subcategory
 *  */
import React from 'react';
import { ActivityIndicator, Image as NativeImage } from 'react-native';
import { ResponsiveImageProps } from './types';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { FastImageProgress } from '@components';
import { Size } from '@common/types';

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
  const [imageSize, setImageSize] = React.useState<Size>({
    width: 0,
    height: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    NativeImage.getSize(uri, (width, height) => {
      const newWidth = SCREEN_WIDTH;
      const newHeight = (height / width) * newWidth;

      setImageSize({ width: newWidth, height: newHeight });
      setIsLoading(false);
    });
  }, [uri]);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FastImageProgress
      source={{ uri }}
      style={{
        width: imageSize.width,
        height: imageSize.height,
        ...rest.style,
      }}
      {...rest}
    />
  );
};

export default ResponsiveImage;
