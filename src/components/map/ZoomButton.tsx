import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Button, Icon } from 'react-native-elements';

type Props = {
  buttonStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  onLongPress?: () => void;
};

export const Plus = ({
  buttonStyle,
  containerStyle,
  onPress,
  onLongPress,
}: Props) => (
  <Button
    icon={<Icon name="plus" type="font-awesome-5" color={'white'} />}
    containerStyle={containerStyle}
    buttonStyle={[styles.buttonStyle, buttonStyle]}
    onPress={onPress}
    onLongPress={onLongPress}
  />
);

export const Minus = ({
  buttonStyle,
  containerStyle,
  onPress,
  onLongPress,
}: Props) => (
  <Button
    icon={<Icon name="minus" type="font-awesome-5" color={'white'} />}
    containerStyle={containerStyle}
    buttonStyle={[styles.buttonStyle, buttonStyle]}
    onPress={onPress}
    onLongPress={onLongPress}
  />
);

const styles = StyleSheet.create({
  buttonStyle: { backgroundColor: 'gray', borderRadius: 50 },
});
