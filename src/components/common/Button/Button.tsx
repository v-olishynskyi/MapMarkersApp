/**
 * @namespace Button
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ButtonProps } from './types';
import { ActivityIndicator } from 'react-native';
import { Button as RNUILibButton } from 'react-native-ui-lib';

/**
 * Button
 *
 * @memberof SharedComponents
 * @param {ButtonProps} params
 *
 * @example
 * // How to use Button:
 *  <Button />
 */
const Button: React.FC<ButtonProps> = ({ loading, ...rest }) => {
  const styles = useStyles();

  return (
    <RNUILibButton enableShadow disabled={loading || rest.disabled} {...rest}>
      {loading && <ActivityIndicator style={styles.loader} />}
    </RNUILibButton>
  );
};

export default Button;
