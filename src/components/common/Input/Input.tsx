/**
 * @namespace Input
 * @category Components
 * @subcategory Shared
 *  */

import React, { useEffect } from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import { InputProps } from './types';
import useStyles from './styles';
import { getTheme } from '@utils/helpers';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
  onChangeText,
  value,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  caption,
  onFocus,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputHeight, setInputHeight] = React.useState(0);

  // const placeholderTextColor = dark ? colors.white40 : colors.black40;

  const styles = useStyles(!!error);

  const captionTop = useSharedValue(inputHeight / 2);
  const captionFontSize = useSharedValue(16);
  const captionLineHeight = useSharedValue(24);

  const animatedStyles = useAnimatedStyle(() => ({
    top: captionTop.value,
    fontSize: captionFontSize.value,
    lineHeight: captionLineHeight.value,
  }));

  const isCaptionOnTop = isFocused || !!value;

  useEffect(() => {
    if (isCaptionOnTop) {
      captionTop.value = withTiming(-8, {
        duration: 100,
        easing: Easing.linear,
      });
      captionFontSize.value = withTiming(12, {
        duration: 100,
        easing: Easing.linear,
      });
      captionLineHeight.value = withTiming(16, {
        duration: 100,
        easing: Easing.linear,
      });
    } else {
      captionTop.value = withTiming(10, {
        duration: 100,
        easing: Easing.linear,
      });
      captionFontSize.value = withTiming(16, {
        duration: 100,
        easing: Easing.linear,
      });
      captionLineHeight.value = withTiming(24, {
        duration: 100,
        easing: Easing.linear,
      });
    }
  }, [isCaptionOnTop]);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus(e) && onFocus(e);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    setInputHeight(e.nativeEvent.layout.height);
  };

  return (
    <View>
      <View style={[styles.container, containerStyle]} onLayout={}>
        {leftIcon && (
          <View style={[styles.pv2, styles.iconContainer, styles.leftIcon]}>
            {leftIcon}
          </View>
        )}
        <TextInput
          {...rest}
          value={value}
          onChangeText={onChangeText}
          style={[styles.pv2, styles.input]}
          onFocus={handleFocus}
          placeholder={
            placeholder
              ? !isCaptionOnTop
                ? placeholder
                : undefined
              : undefined
          }
        />
        {rightIcon && (
          <View style={[styles.pv2, styles.iconContainer, styles.rightIcon]}>
            {rightIcon}
          </View>
        )}
      </View>
      {!!error && typeof error === 'string' && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
};

export default Input;
