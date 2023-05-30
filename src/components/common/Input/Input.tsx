/**
 * @namespace Input
 * @category Components
 * @subcategory Shared
 *  */

import React from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
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
import { EyeIcon } from '@assets/icons';

/**
 *
 * Input component.
 *
 * @memberof Input
 * @example
 *
 * // How to use
 * <Input value={inputValue} onChange={setInputValue} caption="Input caption" />
 *
 * // How to use with Formik
 * <Input
 *  value={inputValue}
 *  onBlur={setInputValue}
 *  caption="Input caption"
 *  errors={errors.email]}
 *  showError={errors.email && touched.emai}
 * />
 *
 */

const Input: React.FC<InputProps> = ({
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
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const styles = useStyles(!!error, isFocused);

  const [showPassword, setShowPassword] = React.useState(password);

  const sharedHeight = useSharedValue(13.3 * Number(!!error));

  const height = useAnimatedStyle(() => ({
    height: sharedHeight.value,
  }));

  const errorComponent = (
    <Animated.Text style={[styles.error, height]}>{error}</Animated.Text>
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
    <Pressable onPress={() => setShowPassword(prev => !prev)}>
      <EyeIcon />
    </Pressable>
  );

  const passwordProps = {
    secureTextEntry: showPassword,
    rightIcon: passwordIcon,
  };

  React.useEffect(() => {
    sharedHeight.value = withTiming(13.3 * Number(!!error), {
      duration: 200,
      easing: Easing.linear,
    });
  }, [error, sharedHeight]);

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
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, inputStyle]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...(password ? passwordProps : {})}
          {...rest}
        />
        {(password || rightIcon) && (
          <View style={[styles.iconContainer, styles.rightIcon]}>
            {password ? passwordIcon : rightIcon}
          </View>
        )}
      </View>
      {!!error && typeof error === 'string' && errorComponent}
    </View>
  );
};

export default Input;
