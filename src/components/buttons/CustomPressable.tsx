import * as React from 'react';
import { Pressable, PressableProps } from 'react-native';

const CustomPressable = (props: PressableProps) => {
  return (
    <Pressable
      {...props}
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.2 : 1,
        },
      ]}>
      {props.children}
    </Pressable>
  );
};

export default CustomPressable;
