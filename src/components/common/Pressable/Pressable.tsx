/**
 * @namespace Pressable
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { Pressable as RNPressable } from 'react-native';
import { PressableProps } from './types';

/**
 * Pressable
 *
 * @memberof SharedComponents
 * @param {PressableProps} params
 *
 * @example
 *  <Pressable />
 */
const Pressable: React.FC<PressableProps> = ({ children, style, ...rest }) => {
  const styles = useStyles();

  return (
    <RNPressable
      style={({ pressed }) => [
        pressed ? styles.pressed : styles.default,
        typeof style !== 'function' ? style : style({ pressed }),
      ]}
      {...rest}>
      {children}
    </RNPressable>
  );
};

export default React.memo(Pressable);
