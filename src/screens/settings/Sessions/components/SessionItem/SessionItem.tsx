/**
 * @namespace SessionItem
 * @category
 * @subcategory
 *  */
import React, { useEffect, useImperativeHandle } from 'react';
import useStyles from './styles';
import { SessionItemProps, SwipeableItemHandler } from './types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { Pressable } from '@components';
import { generalStyles } from '@styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Animated as RNAnimated, Text, View } from 'react-native';
import { getTheme } from '@common/helpers';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

/**
 * SessionItem
 *
 *
 * @memberof
 * @param {SessionItemProps} params
 *
 * @example
 * // How to use SessionItem:
 *  <SessionItem />
 */
const SessionItem = React.forwardRef<SwipeableItemHandler, SessionItemProps>(
  ({ isEditMode, onDelete, onPress, onPressMinus, session }, ref) => {
    const { colors } = getTheme();
    const styles = useStyles();

    const swipeableRef = React.useRef<Swipeable>(null);

    useImperativeHandle(ref, () => ({
      close: () => swipeableRef.current?.close(),
      openRight: () => swipeableRef.current?.openRight(),
    }));

    const renderRightActions = (
      progressAnimatedValue: RNAnimated.AnimatedInterpolation<string | number>,
    ) => {
      const trans = progressAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [128, 0],
      });

      return (
        <View style={styles.rightActionsContainer}>
          <RNAnimated.View
            style={[
              styles.actionButtonContainer,
              {
                transform: [{ translateX: trans }],
              },
            ]}>
            <RectButton style={styles.rectButton} onPress={onDelete}>
              <Icon size={26} name="trash" color={colors.white} />
              <Text style={styles.actionText}>Видалити</Text>
            </RectButton>
          </RNAnimated.View>
        </View>
      );
    };

    const isShowMinus = useSharedValue(isEditMode);

    useEffect(() => {
      if (isEditMode) {
        isShowMinus.value = true;
      } else {
        isShowMinus.value = false;
      }
    }, [isEditMode, isShowMinus]);

    const minusIconStyle = useAnimatedStyle(() => {
      return {};
    });

    return (
      <Swipeable
        ref={swipeableRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={renderRightActions}
        containerStyle={styles.container}
        childrenContainerStyle={[generalStyles.row]}>
        <Pressable style={[generalStyles.row]} onPress={onPress}>
          {isEditMode && (
            <Animated.View style={minusIconStyle}>
              <Pressable
                style={styles.minusIconContainer}
                onPress={onPressMinus}>
                <Icon
                  size={16}
                  name="remove"
                  style={styles.minusIcon}
                  color={colors.white}
                />
              </Pressable>
            </Animated.View>
          )}
          <View style={styles.iconContainer}>
            <Icon size={20} name="logo-apple" />
          </View>
          <View style={styles.info}>
            <Text style={styles.device} numberOfLines={1}>
              {session.id}
              {session.device}
            </Text>
            <Text style={styles.version} numberOfLines={1}>
              Markers 0.0.1
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              Kamianets-Podilskyi, Ukraine
            </Text>
          </View>
        </Pressable>
      </Swipeable>
    );
  },
);

export default SessionItem;
