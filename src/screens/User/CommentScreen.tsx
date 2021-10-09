import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/core';
import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { MainStackParamsList } from '../../navigation/types';

type RoutePropType = RouteProp<MainStackParamsList, 'Comment'>;

const CommentScreen = () => {
  const route = useRoute<RoutePropType>();

  const [comment, setComment] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadComment = async id => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`,
          );
          const data = await response.json();

          // const reducedComments = data.reduce((arr, comment) => {
          //   arr.push({ id: comment.id, title: comment.name });
          //   return arr;
          // }, []);

          // console.log('REDUSADSA', reducedComments);

          setComment(data);

          console.log('data', data);

          setLoading(false);
        } catch (error) {
          console.log('errp', error);
        }
      };

      loadComment(route.params.commentId);
    }, [route.params.commentId]),
  );

  return (
    <View style={styles.container}>
      {loading || !comment ? (
        <ActivityIndicator size={100} />
      ) : (
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
              <Text style={{ fontSize: 18, marginBottom: 6 }}>
                Jack Jackson
              </Text>
              <Text style={{ color: 'gray' }}>{`${new Date().toLocaleDateString(
                'ru-RU',
                { dateStyle: 'long' },
              )}`}</Text>
            </View>
            {/* <ListItem.Content>
          <ListItem.Subtitle>{name}</ListItem.Subtitle>
          <ListItem.Title numberOfLines={2}>{item.body}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron /> */}
          </ListItem>
          <View style={{ marginHorizontal: 16 }}>
            <Text>{comment.body}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
