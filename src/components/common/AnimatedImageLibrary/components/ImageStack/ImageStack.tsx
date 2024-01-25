/**
 * @namespace ImageStack
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ImageStackProps } from './types';
import { Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import AnimatedImage from './AnimatedImage';

/**
 * ImageStack
 *
 * @memberof AnimatedImageLibrary
 * @param {ImageStackProps} params
 *
 * @example
 * // How to use ImageStack:
 *  <ImageStack images={[url]} onPress={onPress} />
 */
const ImageStack: React.FC<ImageStackProps> = ({ onPress, images }) => {
  const styles = useStyles();

  const isPressed = useSharedValue(false);

  return (
    <Pressable
      style={[styles.container]}
      onPress={onPress}
      onPressIn={() => (isPressed.value = true)}
      onPressOut={() => (isPressed.value = false)}>
      {images.map((uri, index) => {
        return (
          <AnimatedImage
            key={uri}
            uri={uri}
            isPressed={isPressed}
            index={index}
          />
        );
      })}
    </Pressable>
  );
};

export default ImageStack;
