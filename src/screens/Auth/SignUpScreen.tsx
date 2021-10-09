import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '../../components/buttons';
import { CustomIconTextInput, CustomTextInput } from '../../components/inputs';
import { hooks } from '../../hooks';
import { MainStackParamsList } from '../../navigation/types';
import { theme } from '../../theme';
import * as MobX from 'mobx-react-lite';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type Navigation = StackNavigationProp<MainStackParamsList>;

const SignUpScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { authStore } = hooks.useStores();

  const [loadingSignUp, setLoadingSignUp] = React.useState(false);

  const handlePressSignUp = async () => {
    try {
      setLoadingSignUp(true);

      await authStore.fakeSignUp();
      authStore.setIsAuth(true);
      navigation.navigate('Main', { screen: 'КАРТА' });

      authStore.clear();
      setLoadingSignUp(false);
    } catch (error) {
      console.log('ERORR', { error });

      setLoadingSignUp(false);
    }
  };

  const goToSignIn = () => {
    navigation.navigate('SignIn');
  };

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <MobX.Observer
      render={() => {
        return (
          <ImageBackground
            source={require('../../../assets/BluredMap.jpg')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover">
            <KeyboardAwareScrollView
              style={styles.container}
              contentContainerStyle={{
                paddingTop: getStatusBarHeight(),
                // width: '100%',
                // height: '100%',
              }}>
              <View style={styles.loginFormContainer}>
                <View style={styles.loginForm}>
                  <Text h1 h1Style={styles.title}>
                    Signup
                  </Text>
                  <CustomTextInput
                    label={'User name'}
                    placeholder={'User name'}
                    onChangeText={authStore.setUsername}
                    value={authStore.username}
                  />
                  <CustomTextInput
                    label={'Name'}
                    placeholder={'Name'}
                    onChangeText={authStore.setName}
                    value={authStore.name}
                  />
                  <CustomTextInput
                    label={'Family name'}
                    placeholder={'Family name'}
                    onChangeText={authStore.setFamilyName}
                    value={authStore.family_name}
                  />
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
                  <CustomIconTextInput
                    label={'Confirm password'}
                    placeholder={'Confirm password'}
                    rightIcon={
                      <Icon
                        name="eye"
                        type="font-awesome-5"
                        color={'gray'}
                        onPress={() => {}}
                      />
                    }
                    secureTextEntry
                    inputContainerStyle={{ marginBottom: 20 }}
                    onChangeText={authStore.setConfirmPassword}
                    value={authStore.confirmPassword}
                  />

                  <CustomButton
                    title={'Signup'}
                    onPress={handlePressSignUp}
                    loading={loadingSignUp}
                    disabled={loadingSignUp}
                    buttonStyle={{ marginBottom: 100 }}
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
                  <Text style={styles.whiteText}>Already have an account?</Text>
                  <Button
                    title="Login"
                    type="clear"
                    titleStyle={styles.inlineSignUp}
                    onPress={goToSignIn}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
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
  logo: {
    backgroundColor: 'purple',
  },
  loginFormContainer: {
    height: '100%',
    width: '100%',
    // backgroundColor: '#000',
    paddingHorizontal: 30,
    // justifyContent: 'center',
    // alignSelf: 'center',
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
