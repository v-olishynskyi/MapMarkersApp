/**
 * @namespace SignIn
 * @category Screens
 * @subcategory Auth screens
 *  */
import React from 'react';
import View from 'react-native-ui-lib/view';
import { useFormik } from 'formik';
import { FormState } from './types';
import { KeyboardAvoidingView } from 'react-native';
import { Input, Button } from '@components';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import validationSchema from './schema';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamsList } from '@navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useStyles from './styles';

const defaultState: FormState = {
  email: '',
  password: '',
};

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
    useNavigation<NativeStackNavigationProp<AuthStackParamsList>>();
  const height = useHeaderHeight();
  const styles = useStyles();

  const {
    authStore: { signIn, isLoading },
  } = useStores();

  const onSubmit = async (values: FormState) => {
    try {
      await signIn(values);
      resetForm();
    } catch (error) {}
  };

  const {
    errors,
    handleSubmit,
    handleBlur,
    touched,
    values,
    setFieldValue,
    resetForm,
  } = useFormik<FormState>({
    initialValues: defaultState,
    validationSchema,
    onSubmit,
  });

  const handleChangeInput = (field: keyof FormState) => (value: string) =>
    setFieldValue(field, value);

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
          <Button label="Вхід" onPress={handleSubmit} loading={isLoading} />
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
