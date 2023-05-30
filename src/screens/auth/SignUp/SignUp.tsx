/**
 * @namespace SignIn
 * @category Screens
 * @subcategory Auth screens
 *  */
import React from 'react';
import View from 'react-native-ui-lib/view';
import { useFormik } from 'formik';
import { FormState } from './types';
import { Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Input } from '@components';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { IS_IOS, getTheme } from '@utils/helpers';
import { spacingBase } from '@styles';
import { Button } from 'react-native-ui-lib';
import validationSchema from './schema';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationStackParamsList } from '@navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
    useNavigation<NativeStackNavigationProp<AuthNavigationStackParamsList>>();
  const height = useHeaderHeight();

  const styles = useStyles();
  const { authStore } = useStores();

  const onSubmit = (values: FormState) => {
    Alert.alert('', JSON.stringify(values));
  };

  const { errors, handleSubmit, handleBlur, touched, setFieldValue, values } =
    useFormik<FormState>({
      initialValues: { email: authStore.email, password: authStore.password },
      validationSchema,
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

  const onPressForgotPassword = () => navigation.navigate('forgot-password');
  const onPressSignUp = () => navigation.navigate('sign-up');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={height + 70}>
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
          placeholder="Пароль мусить містити більше 6 символів"
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
        <Button
          label="Вхід"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
        <Button
          label="Ще не маєте аккаунту? Зареєструватись"
          link
          onPress={onPressSignUp}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default observer(SignUp);

const useStyles = () => {
  const {
    uiStore: { isPortrait },
  } = useStores();
  const { colors } = getTheme();
  const { bottom, left, right } = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.card,
      justifyContent: 'space-between',
      paddingBottom: IS_IOS ? bottom + spacingBase.s4 : spacingBase.s4,
      paddingLeft: isPortrait ? spacingBase.s4 : left,
      paddingRight: isPortrait ? spacingBase.s4 : right,
      paddingTop: spacingBase.s3,
    },
    form: {
      width: '100%',
    },
    input: {
      marginBottom: spacingBase.s3,
    },
    forgotPassword: {
      alignSelf: 'flex-start',
    },
    submitButton: {
      marginBottom: spacingBase.s2,
    },
  });
};
