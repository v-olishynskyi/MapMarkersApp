import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Input, InputProps } from 'react-native-elements';

const CustomIconTextInput = (props: InputProps) => {
  return (
    <Input
      {...props}
      label={props.label}
      labelStyle={[styles.inputLabel, props.labelStyle]}
      placeholder={props.placeholder}
      inputStyle={[styles.inputStyle, props.inputStyle]}
      inputContainerStyle={[
        styles.inputContainerStyle,
        props.inputContainerStyle,
      ]}
      rightIcon={props.rightIcon}
      rightIconContainerStyle={[
        styles.rightIconStyle,
        props.rightIconContainerStyle,
      ]}
      containerStyle={styles.containerStyle}
    />
  );
};

export default CustomIconTextInput;

const styles = StyleSheet.create({
  containerStyle: { paddingHorizontal: 0 },
  inputStyle: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 20,
  },

  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 18,
    letterSpacing: 0.6,
  },
  rightIconStyle: {
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? 54 : 60,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingRight: 20,
  },
});
