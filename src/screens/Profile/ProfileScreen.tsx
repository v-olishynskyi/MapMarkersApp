import * as React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Observer } from 'mobx-react-lite';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { CustomButton, CustomPressable } from '../../components/buttons';
import { hooks } from '../../hooks';
import { MainStackParamsList } from '../../navigation/types';
import AvatarImage from '../../components/images/Avatar';
import auth from '@react-native-firebase/auth';

type Navigation = StackNavigationProp<MainStackParamsList>;

const ProfileScreen = () => {
  const navigation = useNavigation<Navigation>();

  const { authStore, mainStore } = hooks.useStores();

  const { user } = mainStore;

  const goToComments = async () => {
    navigation.push('Comments');
  };

  const goToMarkers = async () => {
    navigation.push('Markers');
  };

  const handlePressSignOut = async () => {
    try {
      await authStore.signOut();

      navigation.navigate('SignIn');
    } catch (error) {
      console.log('handlePressSignOut error', { error });
    }
  };

  const test = async () => {
    try {
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Observer
      render={() => {
        return (
          <ScrollView style={styles.container}>
            <View style={styles.avatarBlock}>
              <AvatarImage
                title={`${user!.name.charAt(0).toUpperCase()}${user!.family_name
                  .charAt(0)
                  .toUpperCase()}`}
                uri={'https://picsum.photos/200/300'}
                size={'xlarge'}
              />
            </View>
            <View style={styles.name}>
              <Text h2 style={styles.fullname}>
                {`${mainStore.user?.name} ${mainStore.user?.family_name}`}
              </Text>
              <Text style={styles.email}>{mainStore.user?.email}</Text>
            </View>
            <Divider />
            <View style={styles.contentContainer}>
              {/* <CustomButton title={'Test 1'} onPress={test} /> */}
              <CustomPressable onPress={goToMarkers}>
                <ListItem
                  containerStyle={{ paddingHorizontal: 0 }}
                  bottomDivider>
                  <Icon name="map-marker-alt" type="font-awesome-5" />
                  <ListItem.Content>
                    <ListItem.Title>Маркери</ListItem.Title>
                  </ListItem.Content>
                  <Text>{mainStore.user!.markersCount}</Text>
                  <ListItem.Chevron size={22} />
                </ListItem>
              </CustomPressable>

              <CustomPressable onPress={goToComments}>
                <ListItem containerStyle={{ paddingHorizontal: 0 }}>
                  <Icon name="comment" solid size={18} type="font-awesome-5" />
                  <ListItem.Content>
                    <ListItem.Title>Коментарі</ListItem.Title>
                  </ListItem.Content>
                  <Text>0</Text>
                  <ListItem.Chevron size={22} />
                </ListItem>
              </CustomPressable>
            </View>
            <Divider />
            <CustomPressable onPress={handlePressSignOut}>
              <ListItem>
                <Icon name="sign-out-alt" type="font-awesome-5" />
                <ListItem.Content>
                  <ListItem.Title>Вийти</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </CustomPressable>
          </ScrollView>
        );
      }}
    />
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  avatarBlock: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    marginBottom: 20,
  },
  fullname: { textAlign: 'center', marginBottom: 10 },
  email: { textAlign: 'center', color: 'gray' },
});
