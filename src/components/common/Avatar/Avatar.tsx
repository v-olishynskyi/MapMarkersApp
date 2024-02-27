/**
 * @namespace Avatar
 * @category
 * @subcategory
 *  */
import React from 'react';
import { AvatarProps } from './types';
import RNUiLibAvatar from 'react-native-ui-lib/avatar';
import { FastImageProgress, ImageViewer, Pressable } from '@components';
import useStyles from './styles';

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
  onPress,
  containerStyle,
}) => {
  const styles = useStyles();
  const imageViewerRef = React.useRef<ImageViewer>(null);

  const avatar = (
    <FastImageProgress
      // @ts-ignore
      source={{ uri: url }}
      style={[containerStyle, { width: size, height: size }]}
      imageStyle={[styles.image]}
    />
  );

  return (
    <>
      {!url ? (
        <RNUiLibAvatar
          animate
          label={initials}
          useAutoColors
          name={fullname}
          size={size}
          containerStyle={containerStyle}
          onPress={onPress}
        />
      ) : (
        <>
          {onPress ? <Pressable onPress={onPress}>{avatar}</Pressable> : avatar}
          {url && <ImageViewer ref={imageViewerRef} images={[url]} />}
        </>
      )}
    </>
  );
};

export default Avatar;
