/**
 * @namespace RadioButton
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { RadioButtonProps } from './types';
import RNUiLibRadioButton from 'react-native-ui-lib/radioButton';

/**
 * RadioButton
 *
 * @memberof
 * @param {RadioButtonProps} params
 *
 * @example
 * // How to use RadioButton:
 *  <RadioButton />
 */
const RadioButton: React.FC<RadioButtonProps> = props => {
  const styles = useStyles();

  return (
    <RNUiLibRadioButton
      {...props}
      contentOnLeft
      containerStyle={[styles.radioButtonContainer, props.containerStyle]}
      // @ts-ignore
      labelStyle={[styles.radioButtonLabel, props.labelStyle]}
    />
  );
};

export default RadioButton;
