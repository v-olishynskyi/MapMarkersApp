/**
 * @namespace ImageZoomComponent
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ImageZoomComponentProps } from './types';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Image as NativeImage, View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { Loader } from '@components';

// const START_POSITION_X = 0;
// const END_POSITION_X = SCREEN_WIDTH;

// const START_POSITION_Y = 0;
// const END_POSITION_Y = SCREEN_HEIGHT;

/**
 * ImageZoomComponent
 *
 * @memberof
 * @param {ImageZoomComponentProps} params
 *
 * @example
 * // How to use ImageZoomComponent:
 *  <ImageZoomComponent />
 */
const ImageZoomComponent: React.FC<ImageZoomComponentProps> = ({ uri }) => {
  const styles = useStyles();

  const [isLoading, setIsLoading] = React.useState(true);
  const [imageWidth, setImageWidth] = React.useState(0);
  const [imageHeight, setImageHeight] = React.useState(0);
  const [maxScaleValue, setMaxScaleValue] = React.useState(1);

  const onLeft = useSharedValue(true);
  const scale = useSharedValue(1);
  const translate = {
    translateX: useSharedValue(0),
    translateY: useSharedValue(0),
  };

  React.useEffect(() => {
    const getImageSizes = async () => {
      NativeImage.getSize(uri, (width, height) => {
        const newWidth = SCREEN_WIDTH;
        const newHeight = (height / width) * newWidth;

        const maxScale = SCREEN_HEIGHT / newHeight;
        setMaxScaleValue(maxScale);

        setImageWidth(newWidth);
        setImageHeight(newHeight);
      });
    };

    getImageSizes().then(async () => {
      setIsLoading(false);
    });
  }, [uri]);

  const pan = Gesture.Pan().onUpdate(e => {
    console.log('pan', e);

    if (onLeft.value) {
      translate.translateX.value = e.translationX;
      translate.translateY.value = e.translationY;
    } else {
      translate.translateX.value = e.translationX;
      translate.translateY.value = e.translationY;
    }
  });

  const pinch = Gesture.Pinch()
    .onUpdate(e => {
      if (e.scale < scale.value) {
        return;
      }
      scale.value = e.scale;
    })
    .onFinalize(e => {
      if (e.scale < 1) {
        scale.value = withTiming(1, { duration: 200 });
      }

      if (e.scale > maxScaleValue) {
        scale.value = withTiming(maxScaleValue, { duration: 200 });
      }
    });

  const tap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      if (scale.value > 1) {
        scale.value = withTiming(1, { duration: 200 });
      } else {
        scale.value = withTiming(maxScaleValue, { duration: 200 });
      }
    });

  const gestures = Gesture.Simultaneous(pan, pinch, tap);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
        { translateX: translate.translateX.value },
        { translateY: translate.translateY.value },
      ],
    };
  });

  return (
    <View style={styles.imageContainer}>
      <GestureDetector gesture={gestures}>
        {isLoading ? (
          <Loader />
        ) : (
          <Animated.Image
            source={{ uri }}
            style={[
              styles.image,
              {
                width: imageWidth,
                height: imageHeight,
              },
              animatedStyles,
            ]}
          />
        )}
      </GestureDetector>
    </View>
  );
};

export default ImageZoomComponent;
