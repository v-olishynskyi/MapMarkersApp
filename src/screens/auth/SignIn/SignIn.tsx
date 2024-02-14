/**
 * @namespace SignIn
 * @category Screens
 * @subcategory Auth screens
 *  */
import React from 'react';
import View from 'react-native-ui-lib/view';
import validationSchema from './schema';
import useStyles from './styles';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import { useFormik } from 'formik';
import { FormState } from './types';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { Input, Button } from '@components';
import { observer } from 'mobx-react-lite';
import { useHeaderHeight } from '@react-navigation/elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AuthStackParamsList } from '@navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLogin } from '@api/hooks/auth';
import { LoginData } from '@services/auth';
import { IS_IOS } from '@common/helpers';
import { Device, Platforms } from '@common/types';

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

  const emailInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);

  const { mutateAsync: login, isPending } = useLogin();

  const onSubmit = async (values: FormState) => {
    try {
      const name = IS_IOS
        ? await DeviceInfo.getDeviceName()
        : DeviceInfo.getSystemName();

      const device: Device = {
        id: await getUniqueId(),
        name,
        platform: IS_IOS ? Platforms.IOS : Platforms.ANDROID, // TODO: change if need support web
      };

      const loginData: LoginData = {
        device,
        email: values.email,
        password: values.password,
      };

      await login(loginData);
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

  const isFocused = useIsFocused();
  const handleUnfocus = React.useCallback(() => {
    emailInputRef.current?.blur();
    passwordInputRef.current?.blur();
    resetForm();
  }, [resetForm]);

  React.useEffect(() => {
    if (!isFocused) {
      handleUnfocus();
    }
  }, [isFocused, handleUnfocus]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={IS_IOS ? 'padding' : 'height'}
      keyboardVerticalOffset={height}>
      <View style={[styles.form]}>
        <Input
          ref={emailInputRef}
          value={values.email}
          caption={'E-mail'}
          onChangeText={handleChangeInput('email')}
          onBlur={handleBlur('email')}
          style={styles.input}
          error={touched.email && errors.email}
          clearButtonMode="while-editing"
          placeholder="E-mail"
          keyboardType="email-address"
          textContentType="emailAddress"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Input
          ref={passwordInputRef}
          value={values.password}
          caption={'Пароль'}
          onChangeText={handleChangeInput('password')}
          onBlur={handleBlur('password')}
          error={touched.password && errors.password}
          placeholder="Не менше 6 символів"
          password
          style={styles.input}
          textContentType="password"
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
          <Button label="Вхід" onPress={handleSubmit} loading={isPending} />
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
