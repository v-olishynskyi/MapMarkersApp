/**
 * @namespace SignIn
 * @category Screens
 * @subcategory Auth screens
 *  */
import React from 'react';
import useStyles from './styles';
import View from 'react-native-ui-lib/view';
import TextField from 'react-native-ui-lib/textField';
import { useFormik } from 'formik';
import { FormState } from './types';
import { Alert, Dimensions, TextInput } from 'react-native';
import { Input } from '@components';
import { useStores } from '@store';
import { Observer } from 'mobx-react-lite';

/**
 * SignIn
 *
 *
 * @memberof Auth
 *
 * @example
 * // How to use SignIn:
 *  <SignIn />
 */
const SignIn: React.FC = () => {
  const styles = useStyles();
  const { authStore } = useStores();

  const onSubmit = (values: FormState) => {
    Alert.alert('', JSON.stringify(values));
  };

  const { errors, handleSubmit, handleBlur, touched, setFieldValue, values } =
    useFormik<FormState>({
      initialValues: { email: authStore.email, password: authStore.password },
      onSubmit,
    });

  const handleChangeInput = (field: keyof FormState) => (value: string) => {
    setFieldValue(field, value);

    field === 'email'
      ? authStore.setEmail(value)
      : field === 'password'
      ? authStore.setPassword(value)
      : null;
  };

  return (
    <Observer
      render={() => {
        return (
          <View flexG centerV centerH>
            <View style={{ width: Dimensions.get('screen').width * 0.7 }}>
              <Input
                value={values.email}
                onChangeText={handleChangeInput('email')}
                onBlur={handleBlur('email')}
                // error={touched.email && errors.email}
                error="asdlnasjkd"
                leftIcon={
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: 'black',
                      borderRadius: 50,
                    }}
                  />
                }
                rightIcon={
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: 'black',
                      borderRadius: 50,
                    }}
                  />
                }
                placeholder="Email"
              />
            </View>
          </View>
        );
      }}
    />
  );
};

export default SignIn;
