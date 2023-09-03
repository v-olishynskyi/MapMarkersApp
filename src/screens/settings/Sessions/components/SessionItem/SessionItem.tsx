/**
 * @namespace SessionItem
 * @category
 * @subcategory
 *  */
import React from 'react';
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
import { PlatformIcon } from '../';
import { useStores } from '@store';

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
  (
    {
      isEditMode,
      onDelete,
      onPress,
      onPressMinus,
      session,
      enableSwipeable = true,
    },
    ref,
  ) => {
    const { colors } = getTheme();
    const styles = useStyles();
    const {
      authStore: { currentSession },
    } = useStores();

    const swipeableRef = React.useRef<Swipeable>(null);

    const isCurrentSession = React.useMemo(
      () => currentSession?.id === session.id,
      [currentSession, session],
    );

    React.useImperativeHandle(ref, () => ({
      close: () => swipeableRef.current?.close(),
      openRight: () => swipeableRef.current?.openRight(),
    }));

    const handleDelete = React.useCallback(
      () => onDelete(session.id),
      [onDelete, session],
    );

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
            <RectButton style={styles.rectButton} onPress={handleDelete}>
              <Icon size={20} name="trash" color={colors.white} />
              <Text style={styles.actionText}>Видалити</Text>
            </RectButton>
          </RNAnimated.View>
        </View>
      );
    };

    const isShowMinus = useSharedValue(isEditMode);

    React.useEffect(() => {
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
        childrenContainerStyle={[generalStyles.row]}
        enabled={enableSwipeable}>
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
          <PlatformIcon
            size="small"
            platform={session.device.platform}
            style={styles.iconContainer}
          />
          <View style={styles.info}>
            <Text style={styles.device} numberOfLines={1}>
              {session.device.name} {isCurrentSession && '(Цей пристрій)'}
            </Text>
            <Text style={styles.version} numberOfLines={1}>
              Markers {session.device.platform} {session.app_version}
            </Text>
            {/* <Text style={styles.location} numberOfLines={1}>
              Kamianets-Podilskyi, Ukraine
            </Text> */}
          </View>
        </Pressable>
      </Swipeable>
    );
  },
);

export default React.memo(SessionItem);
