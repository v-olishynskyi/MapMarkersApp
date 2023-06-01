/**
 * @namespace SignIn
 * @category Screens
 * @subcategory Auth screens
 *  */
import React from 'react';
import View from 'react-native-ui-lib/view';
import { useFormik } from 'formik';
import { FormState } from './types';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Input } from '@components';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-native-ui-lib';
import validationSchema from './schema';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationStackParamsList } from '@navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useStyles from './styles';

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
const SignIn: React.FC = observer(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationStackParamsList>>();
  const height = useHeaderHeight();
  const styles = useStyles();

  const {
    authStore: { signIn, email, password, setEmail, setPassword, isLoading },
  } = useStores();

  const onSubmit = async (values: FormState) => {
    const { email: formEmail, password: formPassword } = values;

    await signIn(formEmail, formPassword);
  };

  const { errors, handleSubmit, handleBlur, touched, setFieldValue, values } =
    useFormik<FormState>({
      initialValues: { email: email, password: password },
      validationSchema,
      onSubmit,
    });

  const handleChangeInput = (field: keyof FormState) => (value: string) => {
    setFieldValue(field, value);

    field === 'email'
      ? setEmail(value)
      : field === 'password'
      ? setPassword(value)
      : null;
  };

  const onPressForgotPassword = () => navigation.navigate('forgot-password');
  const onPressSignUp = () => navigation.navigate('sign-up');
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={height + 64}>
      <View style={[styles.form]}>
        <Input
          value={values.email}
          caption={'E-mail'}
          onChangeText={handleChangeInput('email')}
          onBlur={handleBlur('email')}
          style={styles.input}
          error={touched.email && errors.email}
          clearButtonMode="while-editing"
          placeholder="E-mail"
        />
        <Input
          value={values.password}
          caption={'Пароль'}
          onChangeText={handleChangeInput('password')}
          onBlur={handleBlur('password')}
          error={touched.password && errors.password}
          placeholder="Не менше 6 символів"
          password
          style={styles.input}
        />
        <Button
          label="Забули пароль?"
          link
          style={styles.forgotPassword}
          onPress={onPressForgotPassword}
        />
      </View>
      <View>
        <View style={styles.submitButton}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Button label="Вхід" onPress={handleSubmit} />
          )}
        </View>
        <Button
          label="Ще не маєте аккаунту? Зареєструватись"
          link
          onPress={onPressSignUp}
        />
      </View>
    </KeyboardAvoidingView>
  );
});

export default SignIn;
