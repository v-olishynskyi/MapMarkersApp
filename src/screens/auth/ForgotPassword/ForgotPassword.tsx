/**
 * @namespace ForgotPassword
 * @category Screens
 * @subcategory Auth screens
 *  */
import React from 'react';
import useStyles from './styles';
import { ForgotPasswordProps } from './types';
import { View } from 'react-native';

/**
 * ForgotPassword
 *
 *
 * @memberof Auth
 * @param {ForgotPasswordProps} params
 *
 * @example
 * // How to use ForgotPassword:
 *  <ForgotPassword />
 */
const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const styles = useStyles();

  return <View></View>;
};

export default ForgotPassword;
