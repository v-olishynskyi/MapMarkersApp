/**
 * @namespace SignIn
 * @category Screens
 * @subcategory Auth screens
 *  */
import React from 'react';
import View from 'react-native-ui-lib/view';
import { useFormik } from 'formik';
import { FormState } from './types';
import { Button, Input } from '@components';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import validationSchema from './schema';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamsList } from '@navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useStyles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RegistrationData } from '@services';

const initalState: FormState = {
  email: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  middleName: '',
  password: '',
  username: '',
};

/**
 * SignIn
 *
 *
 * @memberof Auth
 *
 * @example
 * // How to use SignUp:
 *  <SignUp />
 */
const SignUp: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamsList>>();

  const styles = useStyles();
  const {
    authStore: { isLoading, signUp },
  } = useStores();

  const onSubmit = async ({
    email,
    firstName,
    lastName,
    middleName,
    password,
    username,
  }: FormState) => {
    try {
      const data: RegistrationData = {
        email,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        password,
        username,
      };
      await signUp(data);

      resetForm();
      navigation.navigate('sign-in');
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
    initialValues: initalState,
    validationSchema,
    onSubmit,
  });

  const handleChangeInput = (field: keyof FormState) => (value: string) =>
    setFieldValue(field, value);

  const onPressSignIn = () => navigation.navigate('sign-in');

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}>
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
            value={values.firstName}
            caption={'Імʼя'}
            onChangeText={handleChangeInput('firstName')}
            onBlur={handleBlur('firstName')}
            style={styles.input}
            error={touched.firstName && errors.firstName}
            clearButtonMode="while-editing"
            placeholder="Імʼя"
          />
          <Input
            value={values.lastName}
            caption={'Прізвище'}
            onChangeText={handleChangeInput('lastName')}
            onBlur={handleBlur('lastName')}
            style={styles.input}
            error={touched.lastName && errors.lastName}
            clearButtonMode="while-editing"
            placeholder="Прізвище"
          />
          <Input
            value={values.middleName}
            caption={'По-батькові'}
            onChangeText={handleChangeInput('middleName')}
            onBlur={handleBlur('middleName')}
            style={styles.input}
            error={touched.middleName && errors.middleName}
            clearButtonMode="while-editing"
            placeholder="По-батькові"
          />
          <Input
            value={values.password}
            caption={'Пароль'}
            onChangeText={handleChangeInput('password')}
            onBlur={handleBlur('password')}
            error={touched.password && errors.password}
            placeholder="Пароль мусить містити більше 6 символів"
            password
            style={styles.input}
          />
          <Input
            value={values.confirmPassword}
            caption={'Повторіть пароль'}
            onChangeText={handleChangeInput('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={touched.confirmPassword && errors.confirmPassword}
            placeholder="Пароль мусить містити більше 6 символів"
            password
            style={styles.input}
          />
        </View>

        <View style={styles.buttons}>
          <Button
            label="Реєстрація"
            onPress={handleSubmit}
            style={styles.submitButton}
            loading={isLoading}
          />
          <Button
            label="Вже маєте аккаунт? Увійти"
            link
            onPress={onPressSignIn}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default observer(SignUp);
