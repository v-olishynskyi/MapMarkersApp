/**
 * @namespace Input
 * @category Components
 * @subcategory Shared
 *  */

import React from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';
import { InputProps } from './types';
import useStyles from './styles';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from '@components';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

/**
 *
 * Input component.
 *
 * @memberof SharedComponents
 * @example
 *
 * // How to use
 * <Input value={inputValue} onChange={setInputValue} caption="Input caption" />
 *
 * // How to use with Formik
 * <Input
 *  value={inputValue}
 *  onChangeText={setInputValue}
 *  caption="Input caption"
 *  error={"Error"]}
 * />
 *
 */

const Input = React.forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    onFocus,
    error,
    leftIcon,
    rightIcon,
    style: containerStyle,
    value,
    onChangeText,
    caption,
    password,
    inputStyle,
    onBlur,
    ...rest
  } = props;

  const { colors } = getTheme();

  const [isFocused, setIsFocused] = React.useState(false);
  const styles = useStyles(Boolean(error), isFocused);

  const [showPassword, setShowPassword] = React.useState(password);

  const isShowErrorShared = useSharedValue(Boolean(error));
  const errorStyle = useAnimatedStyle(() => {
    const maxHeight = withTiming(isShowErrorShared.value ? 13.3 : 0, {
      duration: 100,
      easing: Easing.linear,
    });
    const marginTop = withTiming(isShowErrorShared.value ? spacingBase.s2 : 0, {
      duration: 100,
      easing: Easing.linear,
    });

    return {
      maxHeight,
      marginTop,
    };
  });

  const errorComponent = (
    <Animated.Text style={[styles.error, errorStyle]}>{error}</Animated.Text>
  );

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const passwordIcon = (
    <Pressable
      onPress={() => setShowPassword(prev => !prev)}
      hitSlop={{ top: 20, bottom: 20 }}>
      <Icon
        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
        style={styles.iconContainer}
        size={24}
        color={colors.gray}
      />
    </Pressable>
  );

  const passwordProps = {
    secureTextEntry: showPassword,
    rightIcon: passwordIcon,
  };

  React.useEffect(() => {
    isShowErrorShared.value = Boolean(error);
  }, [error, isShowErrorShared]);

  return (
    <View style={containerStyle}>
      {caption && <Text style={[styles.caption]}>{caption}</Text>}
      <View style={[styles.inputContainer]}>
        {leftIcon && (
          <View style={[styles.iconContainer, styles.leftIcon]}>
            {leftIcon}
          </View>
        )}
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, inputStyle]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={colors.gray2}
          {...(password ? passwordProps : {})}
          {...rest}
        />
        {(password || rightIcon) && (
          <View style={[styles.iconContainer, styles.rightIcon]}>
            {password ? passwordIcon : rightIcon}
          </View>
        )}
      </View>
      {errorComponent}
    </View>
  );
});

export default Input;
