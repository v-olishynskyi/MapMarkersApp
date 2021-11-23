import * as React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import AvatarImage from '../../components/images/Avatar';
import { hooks } from '../../hooks';
import { MarkerModel } from '../../models/MarkerModel';

type MarkerProps = {
  marker: MarkerModel;
};

const MarkerItem = ({ marker }: MarkerProps) => {
  return (
    <>
      {/* <ListItem.Swipeable
      leftContent={
        <Button
          title="Info"
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
        />
      }
      rightContent={
        <Button
          title="Delete"
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      }> */}
      <ListItem
        hasTVPreferredFocus={undefined}
        tvParallaxProperties={undefined}>
        <AvatarImage
          title={`${marker.owner!.name.charAt(0).toUpperCase()}${marker
            .owner!.family_name.charAt(0)
            .toUpperCase()}`}
          uri={marker.owner.avatar || 'https://picsum.photos/200/300'}
          size={'large'}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{marker.name}</Text>
          <Text style={styles.gray}>
            {new Date(marker.createdAt).toLocaleDateString('ua')}
          </Text>
          <Text style={styles.gray}>{marker.owner.fullName}</Text>
          <Text style={styles.gray}>{marker.owner.email}</Text>
        </View>
      </ListItem>
      <View style={styles.description}>
        <ListItem.Title>{marker.description}</ListItem.Title>
      </View>
      <Divider style={styles.divider} />
      {/* </ListItem.Swipeable> */}
    </>
  );
};

const UserMarkersScreen = () => {
  const renderItem: ListRenderItem<MarkerModel> = ({ item }) => (
    <MarkerItem marker={item} />
  );

  const { mainStore } = hooks.useStores();

  return (
    <View style={styles.container}>
      <FlatList<MarkerModel>
        data={mainStore.user!.markers}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
        maxToRenderPerBatch={10}
        initialNumToRender={5}
      />
    </View>
  );
};

export default UserMarkersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  nameContainer: { flexDirection: 'column' },
  name: { fontSize: 18, marginBottom: 6 },
  gray: { color: 'gray' },
  description: { marginHorizontal: 16 },
  divider: { marginVertical: 12 },
});
