import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Input, InputProps } from 'react-native-elements';

type CustomTextInputProps = {
  secure?: boolean;
} & InputProps;

const CustomTextInput = (props: CustomTextInputProps) => {
  const { secure = false } = props;
  const [secureTextInput, setSecureTextInput] = React.useState(secure);

  const toggleSecureTextInput = () => setSecureTextInput(!secureTextInput);

  return (
    <>
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
        containerStyle={styles.containerStyle}
        secureTextEntry={secureTextInput}
        rightIcon={
          secure && (
            <TouchableOpacity
              onPress={toggleSecureTextInput}
              style={styles.iconContainer}>
              <Icon
                name={secureTextInput ? 'eye' : 'eye-slash'}
                type="font-awesome-5"
                size={25}
                color={'#000'}
              />
            </TouchableOpacity>
          )
        }
        errorStyle={{ fontSize: 16 }}
      />
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  containerStyle: { paddingHorizontal: 0 },
  inputStyle: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 20,
  },

  inputContainerStyle: {
    borderBottomWidth: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    position: 'relative',
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 18,
    letterSpacing: 0.6,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    width: 50,
  },
});
