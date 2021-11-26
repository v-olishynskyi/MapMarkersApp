import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import {
  View,
  StyleSheet,
  Switch,
  ImageBackground,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text, Overlay } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '../../components/buttons';
import { Input } from '../../components/inputs';
import { hooks } from '../../hooks';
import { MainStackParamsList } from '../../navigation/types';
import { theme } from '../../theme';
import * as MobX from 'mobx-react-lite';
import { IS_ANDROID } from '../../utils/constants';
import { FirebaseAuthErrorsCode } from '../../store/ErrorStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const checkIfRememberUserLogin = async () => {
  const deviceRememberMe = JSON.parse(
    // @ts-ignore
    await AsyncStorage.getItem('remember_me'),
  );

  return deviceRememberMe;
};

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
});

type Navigation = StackNavigationProp<MainStackParamsList>;

const SignInScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { authStore, mainStore } = hooks.useStores();

  const [rememberMe, setRememberMe] = React.useState(false);

  const [loadingSignIn, setLoadinSignIn] = React.useState(false);
  const [showForgotModal, setShowForgotModal] = React.useState(false);

  const handleRememberMe = async (value: boolean) => {
    setRememberMe(value);
    await AsyncStorage.setItem('remember_me', JSON.stringify(value));
  };

  const handlePressLogin = async () => {
    try {
      if (!(await authStore.checkIfUserExist())) {
        formik.setErrors({
          email: 'User is not exist',
        });
        return;
      }
      setLoadinSignIn(true);
      await authStore.signIn();
      await mainStore.getUserInstance();
      if (rememberMe) {
        await AsyncStorage.setItem(
          'authData',
          JSON.stringify({
            email: authStore.email,
            password: authStore.password,
          }),
          err => console.log('err', err),
        );
      }
      navigation.navigate('Main', { screen: 'КАРТА' });
      !rememberMe && authStore.clear();
      setLoadinSignIn(false);
    } catch (error) {
      console.log('error', error);
      if (error.code) {
        const errorCode: FirebaseAuthErrorsCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found': {
            formik.setErrors({ email: 'User not found' });
            break;
          }
          case 'auth/wrong-password': {
            formik.setErrors({
              password:
                'The password is invalid or the user does not have a password.',
            });
            break;
          }
          case 'auth/too-many-requests': {
            formik.setErrors({
              email:
                'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later',
            });
            break;
          }
          default:
            break;
        }
      }
      setLoadinSignIn(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: authStore.email,
      password: authStore.password,
    },
    validationSchema: SignInSchema,
    onSubmit: handlePressLogin,
  });

  const handlePressForgot = () => {
    setShowForgotModal(true);
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  React.useEffect(() => {
    (async function () {
      try {
        const result = await checkIfRememberUserLogin();

        if (result) {
          setRememberMe(result);
          const authData: { email: string; password: string } = JSON.parse(
            //@ts-ignore
            await AsyncStorage.getItem('authData'),
          );

          if (authData) {
            authStore.setEmail(authData.email);
            authStore.setPassword(authData.password);
            formik.setValues({
              email: authData.email,
              password: authData.password,
            });
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    })();

    StatusBar.setBarStyle('light-content');
    IS_ANDROID && StatusBar.setBackgroundColor('#000');
  }, []);

  const handleChangeInput =
    (field: 'email' | 'password') => (value: string) => {
      formik.handleChange(field)(value);
      switch (field) {
        case 'email':
          authStore.setEmail(value);
          break;
        case 'password':
          authStore.setPassword(value);
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
            source={require('../../../assets/BluredImage2.jpg')}
            style={styles.fullSize}>
            <ScrollView>
              <KeyboardAwareScrollView>
                <View style={styles.loginFormContainer}>
                  <View style={styles.loginForm}>
                    <Text h1 h1Style={styles.title}>
                      Login
                    </Text>
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
                      errorMessage={formik.errors?.password}
                      secure
                    />
                    <View style={[styles.rowContainer, { marginBottom: 40 }]}>
                      <View style={styles.rowContainer}>
                        <Switch
                          value={rememberMe}
                          onValueChange={handleRememberMe}
                          ios_backgroundColor={'rgb(142,142,147)'}
                          trackColor={{ false: 'rgb(142,142,147)' }}
                        />
                        <Text style={styles.remember}>Remember me</Text>
                      </View>
                      {/* <Button
                        titleStyle={styles.inlineButton}
                        title={'Forgot password?'}
                        type={'clear'}
                        onPress={handlePressForgot}
                      /> */}
                    </View>

                    <CustomButton
                      title={'Login'}
                      onPress={formik.handleSubmit}
                      loading={loadingSignIn}
                      disabled={loadingSignIn}
                      buttonStyle={{ marginBottom: 40 }}
                    />

                    {/* <View style={{ marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ height: 1, backgroundColor: '#fff', flex: 1 }} />
              <View style={{ flex: 1.5 }}>
                <Text style={styles.whiteText}>Or login with</Text>
              </View>
              <View style={{ height: 1, backgroundColor: '#fff', flex: 1 }} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                icon={{
                  name: 'google',
                  type: 'font-awesome-5',
                }}
                type="solid"
                buttonStyle={{ backgroundColor: 'gray', width: 100 }}
              />
              <Button
                icon={{
                  name: 'google',
                  type: 'font-awesome-5',
                }}
                type="solid"
                buttonStyle={{ backgroundColor: 'gray', width: 100 }}
              />
              <Button
                icon={{
                  name: 'google',
                  type: 'font-awesome-5',
                }}
                type="solid"
                buttonStyle={{ backgroundColor: 'gray', width: 100 }}
              />
            </View>
          </View> */}
                    <View
                      style={[
                        styles.rowContainer,
                        { justifyContent: 'center' },
                      ]}>
                      <Text style={styles.whiteText}>
                        Don`t have an account?
                      </Text>
                      <Button
                        title="Signup"
                        type="clear"
                        titleStyle={styles.inlineSignUp}
                        onPress={goToSignUp}
                      />
                    </View>
                  </View>
                </View>
                <Overlay
                  isVisible={showForgotModal}
                  onBackdropPress={() => setShowForgotModal(false)}
                  overlayStyle={{
                    width: '100%',
                    marginHorizontal: 60,
                    backgroundColor: 'gray',
                  }}>
                  <Input label={'Email'} placeholder={'Enter Email address'} />
                  <CustomButton title={'Submit'} />
                </Overlay>
              </KeyboardAwareScrollView>
            </ScrollView>
          </ImageBackground>
        );
      }}
    />
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  logo: {
    backgroundColor: 'purple',
  },
  loginFormContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginForm: {
    // borderWidth: 1,
    // borderColor: '#fff',
  },
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
  },
  remember: {
    // color: 'rgb(142,142,147)',
    color: '#fff',
    fontSize: 17,
    marginLeft: 10,
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
