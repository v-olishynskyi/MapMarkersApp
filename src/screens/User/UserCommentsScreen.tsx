import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { MainStackParamsList } from '../../navigation/types';

type Navigation = StackNavigationProp<MainStackParamsList>;

const Comment = ({ item }) => {
  const nameArr = item.name.split(' ');
  const name = `${nameArr[0]} ${nameArr[nameArr.length - 1]}`;

  return (
    // <ListItem
    //   bottomDivider
    //   // onPress={() => goToComment(item.postId)}
    // >
    //   <Avatar
    //     rounded
    //     size="medium"
    //     title={`${name.split(' ')[0].split('')[0].toUpperCase()}${name
    //       .split(' ')[1]
    //       .split('')[0]
    //       .toUpperCase()}`}
    //     titleStyle={{ color: '#fff' }}
    //     containerStyle={{ backgroundColor: 'gray' }}
    //     // source={require('../../../assets/BluredMap.jpg')}
    //   />
    //   <ListItem.Content>
    //     <ListItem.Subtitle>{name}</ListItem.Subtitle>
    //     <ListItem.Title>{item.body}</ListItem.Title>
    //   </ListItem.Content>
    //   <ListItem.Chevron />
    // </ListItem>
    <>
      <ListItem>
        <Avatar
          rounded
          size="medium"
          title={`CW`}
          titleStyle={{ color: '#fff' }}
          containerStyle={{ backgroundColor: 'gray' }}
          // source={require('../../../assets/BluredMap.jpg')}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 18, marginBottom: 6 }}>{name}</Text>
          <Text style={{ color: 'gray' }}>{`${new Date().toLocaleDateString(
            'ru-RU',
            { dateStyle: 'long' },
          )}`}</Text>
        </View>
      </ListItem>
      <View style={{ marginHorizontal: 16 }}>
        <ListItem.Title>{item.body}</ListItem.Title>
      </View>
      <Divider style={{ marginVertical: 12 }} />
    </>
  );
};

const UserCommentsScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadComments = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/comments',
          );
          const data = await response.json();

          setComments(data);
          setLoading(false);
        } catch (error) {
          console.log('errp', error);
        }
      };

      loadComments();
    }, []),
  );

  const renderItem = ({ item }) => <Comment item={item} />;

  return (
    <View style={styles.container}>
      {!comments || loading ? (
        <ActivityIndicator size={100} />
      ) : (
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={({ id }) => id}
          maxToRenderPerBatch={10}
          initialNumToRender={5}
        />
      )}
    </View>
  );
};

export default UserCommentsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
