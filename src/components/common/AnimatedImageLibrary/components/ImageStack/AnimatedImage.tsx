import React from 'react';
import useStyles from './styles';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FastImageProgress } from '@components';
import { getRandomInt } from '@common/helpers';

type Props = {
  uri: string;
  isPressed: SharedValue<boolean>;
  index: number;
};

const AnimatedImage: React.FC<Props> = ({ uri, isPressed, index }) => {
  const styles = useStyles();

  const initialAngle = index === 0 ? 0 : getRandomInt(-10, 10, false);

  const rotateAngle = useSharedValue(initialAngle);

  const animatedStyle = useAnimatedStyle(() => {
    rotateAngle.value = withTiming(isPressed.value ? 0 : initialAngle, {
      duration: 100,
      easing: Easing.linear,
    });
    const translateY = withTiming(isPressed.value ? index * 4 : 0, {
      duration: 100,
      easing: Easing.linear,
    });

    return {
      zIndex: index,
      transform: [
        {
          rotateZ: `${rotateAngle.value}deg`,
        },
        { translateY },
      ],
    };
  }, []);

  return (
    <Animated.View style={[styles.imageContainer, animatedStyle]}>
      <FastImageProgress source={{ uri }} style={styles.image} />
    </Animated.View>
  );
};

export default AnimatedImage;
