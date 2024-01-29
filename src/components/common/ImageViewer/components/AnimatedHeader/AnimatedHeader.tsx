/**
 * @namespace AnimatedHeader
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { AnimatedHeaderProps } from './types';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text, View } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * AnimatedHeader
 *
 * @memberof
 * @param {AnimatedHeaderProps} params
 *
 * @example
 * // How to use AnimatedHeader:
 *  <AnimatedHeader currentIndex={4} numberOfAllItems={5} isShow={true} onBack={()=>modalRef.close()} />
 */
const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  currentIndex,
  isShow,
  numberOfAllItems,
  onBack,
}) => {
  const styles = useStyles();
  const { top: topInset } = useSafeAreaInsets();

  const top = useSharedValue(topInset);

  const animatedStyle = useAnimatedStyle(() => {
    top.value = withTiming(isShow.value ? topInset : -50, {
      duration: 200,
      easing: Easing.linear,
    });

    return {
      top: top.value,
    };
  }, []);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.overlay} />
      <HeaderBackButton onPress={onBack} style={styles.flex1} />
      <Text style={styles.counter}>
        {currentIndex} з {numberOfAllItems}
      </Text>
      <View style={styles.flex1} />
    </Animated.View>
  );
};

export default AnimatedHeader;
