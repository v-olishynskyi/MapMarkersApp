import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';
import { theme } from '../../theme';

const CustomButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      title={props.title}
      buttonStyle={[styles.buttonStyle, props.buttonStyle]}
      titleStyle={[styles.titleStyle, props.titleStyle]}
      disabledStyle={{ backgroundColor: theme.colors.main_rose, opacity: 0.8 }}
    />
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.main_rose,
    borderRadius: 8,
    paddingVertical: 15,
  },
  titleStyle: { fontWeight: 'bold', fontSize: 20 },
});
