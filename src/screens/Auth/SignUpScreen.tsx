import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '../../components/buttons';
import { Input } from '../../components/inputs';
import { hooks } from '../../hooks';
import { MainStackParamsList } from '../../navigation/types';
import { theme } from '../../theme';
import * as MobX from 'mobx-react-lite';
import { IS_ANDROID } from '../../utils/constants';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FirebaseAuthErrorsCode } from '../../store/ErrorStore';

type Navigation = StackNavigationProp<MainStackParamsList>;

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  family_name: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
  confirm_password: Yup.string().min(6, 'Too short').required('Required'),
});

const SignUpScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { authStore, mainStore } = hooks.useStores();

  const [loadingSignUp, setLoadingSignUp] = React.useState(false);

  const handlePressSignUp = async () => {
    try {
      if (authStore.password !== authStore.confirmPassword) {
        formik.setErrors({
          password: 'Пароли не совпадают',
          confirm_password: 'Пароли не совпадают',
        });
        return;
      }
      setLoadingSignUp(true);

      await authStore.signUp();
      await mainStore.getUserInstance();
      navigation.navigate('Main', { screen: 'КАРТА' });

      authStore.clear();
      setLoadingSignUp(false);
    } catch (error) {
      console.log('ERORR', error);
      if (error.code) {
        const errorCode: FirebaseAuthErrorsCode = error.code;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            formik.setErrors({ email: 'Email already in use' });
            break;

          default:
            break;
        }
      }

      setLoadingSignUp(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: authStore.username,
      name: authStore.name,
      family_name: authStore.family_name,
      email: authStore.email,
      password: authStore.password,
      confirm_password: authStore.confirmPassword,
    },
    validationSchema: SignUpSchema,
    onSubmit: handlePressSignUp,
    validateOnBlur: true,
  });

  const goToSignIn = () => {
    navigation.navigate('SignIn');
  };

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
    IS_ANDROID && StatusBar.setBackgroundColor('#000');
  }, []);

  const handleChangeInput =
    (
      field:
        | 'username'
        | 'name'
        | 'family_name'
        | 'email'
        | 'password'
        | 'confirm_password',
    ) =>
    (value: string) => {
      formik.handleChange(field)(value);

      switch (field) {
        case 'username':
          authStore.setUsername(value);
          break;
        case 'name':
          authStore.setName(value);
          break;
        case 'family_name':
          authStore.setFamilyName(value);
          break;
        case 'email':
          authStore.setEmail(value);
          break;
        case 'password':
          authStore.setPassword(value);
          break;
        case 'confirm_password':
          authStore.setConfirmPassword(value);
          break;

        default:
          break;
      }
    };

  return (
    <MobX.Observer
      render={() => {
        return (
          <ImageBackground
            source={require('../../../assets/BluredMap.jpg')}
            style={styles.fullSize}
            resizeMode="cover">
            <SafeAreaView>
              <ScrollView>
                <KeyboardAwareScrollView>
                  <View style={styles.loginFormContainer}>
                    <View style={styles.loginForm}>
                      <Text h1 h1Style={styles.title}>
                        Signup
                      </Text>
                      <Input
                        label={'User name'}
                        placeholder={'User name'}
                        onChangeText={handleChangeInput('username')}
                        value={formik.values.username}
                        errorMessage={formik.errors?.username}
                      />
                      <Input
                        label={'Name'}
                        placeholder={'Name'}
                        onChangeText={handleChangeInput('name')}
                        value={formik.values.name}
                        errorMessage={formik.errors?.name}
                      />
                      <Input
                        label={'Family name'}
                        placeholder={'Family name'}
                        onChangeText={handleChangeInput('family_name')}
                        value={formik.values.family_name}
                        errorMessage={formik.errors?.family_name}
                      />
                      <Input
                        label={'Email'}
                        placeholder={'Email Address'}
                        onChangeText={handleChangeInput('email')}
                        value={formik.values.email}
                        errorMessage={formik.errors?.email}
                      />
                      <Input
                        label={'Password'}
                        placeholder={'Password'}
                        secureTextEntry
                        onChangeText={handleChangeInput('password')}
                        value={formik.values.password}
                        secure
                        errorMessage={formik.errors?.password}
                      />
                      <Input
                        label={'Confirm password'}
                        placeholder={'Confirm password'}
                        secureTextEntry
                        onChangeText={handleChangeInput('confirm_password')}
                        value={formik.values.confirm_password}
                        secure
                        errorMessage={formik.errors?.confirm_password}
                      />

                      <CustomButton
                        title={'Signup'}
                        onPress={formik.handleSubmit}
                        loading={loadingSignUp}
                        disabled={loadingSignUp || !formik.isValid}
                        buttonStyle={{ marginBottom: 100, marginTop: 20 }}
                      />
                    </View>
                    <View style={styles.bottomSignUp}>
                      <Text style={styles.whiteText}>
                        Already have an account?
                      </Text>
                      <Button
                        title="Login"
                        type="clear"
                        titleStyle={styles.inlineSignUp}
                        onPress={goToSignIn}
                      />
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              </ScrollView>
            </SafeAreaView>
          </ImageBackground>
        );
      }}
    />
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullSize: { width: '100%', height: '100%' },
  logo: {
    backgroundColor: 'purple',
  },
  loginFormContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 30,
  },
  loginForm: {},
  title: {
    fontWeight: '600',
    marginBottom: 50,
    textAlign: 'center',
    color: '#fff',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  remember: {
    // color: 'rgb(142,142,147)',
    color: '#fff',
    fontSize: 17,
  },
  inlineButton: {
    // color: 'rgb(142,142,147)',
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  bottomSignUp: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineSignUp: {
    color: theme.colors.main_rose,
    fontSize: 21,
    fontWeight: 'bold',
  },
  whiteText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
