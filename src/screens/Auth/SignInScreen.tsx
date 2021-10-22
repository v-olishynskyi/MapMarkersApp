import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import {
  View,
  StyleSheet,
  Switch,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { Text, Icon, Divider, Overlay } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '../../components/buttons';
import { CustomIconTextInput, CustomTextInput } from '../../components/inputs';
import { hooks } from '../../hooks';
import { MainStackParamsList } from '../../navigation/types';
import { theme } from '../../theme';
import { wait } from '../../utils/wait';
import * as MobX from 'mobx-react-lite';

const checkIfRememberUserLogin = async () => {
  const deviceRememberMe = JSON.parse(
    await AsyncStorage.getItem('remember_me'),
  );

  return deviceRememberMe;
};

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
      setLoadinSignIn(true);
      await authStore.fakeSignIn();
      await mainStore.getUserInstance();
      navigation.navigate('Main', { screen: 'КАРТА' });

      if (rememberMe) {
        await AsyncStorage.setItem(
          'authData',
          JSON.stringify({
            email: authStore.email,
            password: authStore.password,
          }),
        );
      }
      !rememberMe && authStore.clear();
      setLoadinSignIn(false);
    } catch (error) {
      console.log('eror', { error });

      setLoadinSignIn(false);
    }
  };

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
            await AsyncStorage.getItem('authData'),
          );

          if (authData) {
            authStore.setEmail(authData.email);
            authStore.setPassword(authData.password);
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    })();

    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <MobX.Observer
      render={() => {
        return (
          <ImageBackground
            source={require('../../../assets/BluredImage2.jpg')}
            style={{ width: '100%', height: '100%' }}>
            <KeyboardAwareScrollView
              style={styles.container}
              contentContainerStyle={{
                width: '100%',
                height: '100%',
              }}>
              <View style={styles.loginFormContainer}>
                <View style={styles.loginForm}>
                  <Text h1 h1Style={styles.title}>
                    Login
                  </Text>
                  <CustomTextInput
                    label={'Email'}
                    placeholder={'Email Address'}
                    onChangeText={authStore.setEmail}
                    value={authStore.email}
                  />
                  <CustomIconTextInput
                    label={'Password'}
                    placeholder={'Password'}
                    rightIcon={
                      <Icon
                        name="eye"
                        type="font-awesome-5"
                        color={'gray'}
                        onPress={() => {}}
                      />
                    }
                    secureTextEntry
                    onChangeText={authStore.setPassword}
                    value={authStore.password}
                  />
                  <View style={styles.rowContainer}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Switch
                        value={rememberMe}
                        onValueChange={handleRememberMe}
                        ios_backgroundColor={'rgb(142,142,147)'}
                      />
                      <Text style={styles.remember}>Remember me</Text>
                    </View>
                    <Button
                      titleStyle={styles.inlineButton}
                      title={'Forgot password?'}
                      type={'clear'}
                      onPress={handlePressForgot}
                    />
                  </View>

                  <CustomButton
                    title={'Login'}
                    onPress={handlePressLogin}
                    loading={loadingSignIn}
                    disabled={loadingSignIn}
                    buttonStyle={{ marginBottom: 60 }}
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
                </View>
                <View style={styles.bottomSignUp}>
                  <Text style={styles.whiteText}>Don`t have an account?</Text>
                  <Button
                    title="Signup"
                    type="clear"
                    titleStyle={styles.inlineSignUp}
                    onPress={goToSignUp}
                  />
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
                {/* <View style={{ justiyContent: 'center' }}> */}
                <CustomTextInput
                  label={'Email'}
                  placeholder={'Enter Email address'}
                />
                <CustomButton title={'Submit'} />
                {/* </View> */}
              </Overlay>
            </KeyboardAwareScrollView>
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
  logo: {
    backgroundColor: 'purple',
  },
  loginFormContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginForm: {
    // borderWidth: 1,
    borderColor: '#fff',
  },
  title: {
    fontWeight: '600',
    marginBottom: 80,
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
