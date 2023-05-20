/**
 * @namespace SignUp
 * @category Screens
 * @subcategory Auth screens
 *  */
import React from 'react';
import useStyles from './styles';
import { SignUpProps } from './types';
import { View } from 'react-native';

/**
 * SignUp
 *
 *
 * @memberof Auth
 * @param {SignUpProps} params
 *
 * @example
 * // How to use SignUp:
 *  <SignUp />
 */
const SignUp: React.FC<SignUpProps> = () => {
  const styles = useStyles();

  return <View></View>;
};

export default SignUp;
