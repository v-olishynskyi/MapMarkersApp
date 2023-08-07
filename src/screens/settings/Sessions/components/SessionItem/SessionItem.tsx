/**
 * @namespace SessionItem
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { SessionItemProps } from './types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { Pressable } from '@components';
import { generalStyles } from '@styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Animated, Text, View } from 'react-native';
import { getTheme } from '@common/helpers';

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
const SessionItem = React.forwardRef<Swipeable, SessionItemProps>(
  ({ isEditMode, onDelete, onPress, onPressMinus, session, setRef }, ref) => {
    const { colors } = getTheme();
    const styles = useStyles();

    const renderRightActions = (
      progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
      dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    ) => {
      const trans = progressAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [192, 0],
      });
      return (
        <View
          style={{
            width: 192,
            flexDirection: 'row',
          }}>
          <Animated.View
            style={{
              flex: 1,
              transform: [{ translateX: trans }],
            }}>
            <RectButton
              style={[
                {
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: colors.red,
                },
              ]}
              onPress={onDelete}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  backgroundColor: 'transparent',
                }}>
                Видалити
              </Text>
            </RectButton>
          </Animated.View>
        </View>
      );
    };

    return (
      <Swipeable
        ref={ref}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={renderRightActions}
        onSwipeableOpen={direction => {
          console.log(`Opening swipeable from the ${direction}`);
        }}
        onSwipeableClose={direction => {
          console.log(`Closing swipeable to the ${direction}`);
        }}
        childrenContainerStyle={{ marginBottom: 8 }}>
        <Pressable style={[generalStyles.row]} onPress={onPress}>
          {isEditMode && (
            <Pressable style={styles.minusIconContainer} onPress={onPressMinus}>
              <Icon
                size={16}
                name="remove"
                style={styles.minusIcon}
                color={colors.white}
              />
            </Pressable>
          )}
          <View style={styles.iconContainer}>
            <Icon size={20} name="logo-apple" />
          </View>
          <View style={styles.info}>
            <Text style={styles.device} numberOfLines={1}>
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
