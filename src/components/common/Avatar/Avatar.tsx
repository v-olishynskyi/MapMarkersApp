/**
 * @namespace Avatar
 * @category
 * @subcategory
 *  */
import React from 'react';
import { AvatarProps } from './types';
import { Avatar as RNUiLibAvatar } from 'react-native-ui-lib';

/**
 * Avatar
 *
 *
 * @memberof
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
  return (
    <RNUiLibAvatar
      animate
      label={initials}
      useAutoColors
      name={fullname}
      source={{
        uri: url || undefined,
      }}
      size={size}
      {...rest}
    />
  );
};

export default Avatar;
