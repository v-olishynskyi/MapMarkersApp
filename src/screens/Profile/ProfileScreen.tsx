import * as React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Observer } from 'mobx-react-lite';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Icon, ListItem, Text } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { CustomPressable } from '../../components/buttons';
import { hooks } from '../../hooks';
import { MainStackParamsList } from '../../navigation/types';

type Navigation = StackNavigationProp<MainStackParamsList>;

const ProfileScreen = () => {
  const navigation = useNavigation<Navigation>();

  const { authStore, mainStore } = hooks.useStores();

  const { user } = mainStore;

  const goToComments = () => {
    navigation.push('Comments');
    // const marker = MarkerModel.create({
    //   id: randomUUID,
    //   author: user!,
    //   latitude: 11.11111,
    //   longitude: 22.222222,
    //   name: 'Test',
    //   description: 'qweqweqeqeq',
    // });
    // console.log(marker);
    // user!.addMarker(marker);
  };

  const goToMarkers = () => {
    navigation.push('Markers');
  };

  const handlePressSignOut = async () => {
    await authStore.fakeSignOut();
    navigation.navigate('SignIn');
  };

  return (
    <Observer
      render={() => {
        return (
          <ScrollView style={styles.container}>
            <View style={styles.avatarBlock}>
              <Avatar
                rounded
                size="xlarge"
                title={`${user!.name.charAt(0).toUpperCase()}${user!.family_name
                  .charAt(0)
                  .toUpperCase()}`}
                titleStyle={{ color: '#fff' }}
                containerStyle={{ backgroundColor: 'gray' }}
                source={{ uri: 'https://picsum.photos/200/300' }}
              />
            </View>
            <View style={styles.name}>
              <Text h2 style={{ textAlign: 'center', marginBottom: 10 }}>
                {`${mainStore.user?.name} ${mainStore.user?.family_name}`}
              </Text>
              <Text style={{ textAlign: 'center', color: 'gray' }}>
                {mainStore.user?.email}
              </Text>
            </View>
            <Divider />
            <View style={styles.contentContainer}>
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
                  <Text>10</Text>
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
});
