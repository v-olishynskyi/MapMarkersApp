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
import { wait } from '@common/helpers';

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
const ImageStack: React.FC<ImageStackProps> = ({
  onPress,
  images,
  containerStyle,
}) => {
  const styles = useStyles();

  const isPressed = useSharedValue(false);

  const handlePressStack = async () => {
    isPressed.value = true;
    await wait(200);
    onPress();
    await wait(200);
    isPressed.value = false;
  };

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={handlePressStack}>
      {images.map((uri, index) => {
        return (
          <AnimatedImage
            key={uri}
            uri={uri}
            isPressed={isPressed}
            index={index}
            isLast={index === images.length - 1}
          />
        );
      })}
    </Pressable>
  );
};

export default ImageStack;
