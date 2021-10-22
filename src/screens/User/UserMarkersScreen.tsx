import * as React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { markers } from '../../mock/markers';
import { Marker } from '../../models/models';

type MarkerProps = {
  marker: Marker;
};

const MarkerItem = ({ marker }: MarkerProps) => {
  return (
    <>
      <ListItem>
        <Avatar
          rounded
          size="medium"
          title={`CW`}
          titleStyle={{ color: '#fff' }}
          containerStyle={{ backgroundColor: 'gray' }}
          source={{ uri: marker.author.avatar }}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 18, marginBottom: 6 }}>{marker.name}</Text>
          <Text style={{ color: 'gray' }}>{marker.author.fullName}</Text>
          <Text style={{ color: 'gray' }}>{marker.author.email}</Text>
        </View>
      </ListItem>
      <View style={{ marginHorizontal: 16 }}>
        <ListItem.Title>{marker.description}</ListItem.Title>
      </View>
      <Divider style={{ marginVertical: 12 }} />
    </>
  );
};

const UserMarkersScreen = () => {
  const renderItem: ListRenderItem<Marker> = ({ item }) => (
    <MarkerItem marker={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList<Marker>
        data={markers}
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
});
