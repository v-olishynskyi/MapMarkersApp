/**
 * @namespace Avatar
 * @category
 * @subcategory
 *  */
import React from 'react';
import { AvatarProps } from './types';
import RNUiLibAvatar from 'react-native-ui-lib/avatar';
import { ImageViewer } from '@components';

/**
 * Avatar
 *
 * @memberof SharedComponents
 * @param {AvatarProps} params
 *
 * @example
 * // How to use Avatar:
 *  <Avatar url={'https://url-to-image.com/avatar.png} fullname="Filrsname Lastname" initials="FL" size={40} />
 */
const Avatar: React.FC<AvatarProps> = ({
  url,
  fullname,
  initials,
  size = 64,
  ...rest
}) => {
  const imageViewerRef = React.useRef<ImageViewer>(null);

  return (
    <>
      <RNUiLibAvatar
        animate
        label={initials}
        useAutoColors
        name={fullname}
        source={{
          uri: url || undefined,
        }}
        size={size}
        onPress={() => {
          return url ? imageViewerRef.current?.show() : null;
        }}
        {...rest}
      />
      {url && <ImageViewer ref={imageViewerRef} images={[url]} />}
    </>
  );
};

export default Avatar;
