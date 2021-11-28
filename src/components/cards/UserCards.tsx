import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MarkerModel } from '../../models/MarkerModel';
import { UserModel } from '../../models/UserModel';
import AvatarImage from '../images/Avatar';

type CardProps = {
  user: UserModel;
};

type CalloutUserCardProps = {
  marker?: MarkerModel;
} & CardProps;

export const CalloutUserCard = ({ user, marker }: CalloutUserCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <AvatarImage
            size={'medium'}
            uri={user.avatar ? user.avatar : 'https://picsum.photos/200/300'}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{ fontSize: 18 }}>{`${user.name} ${user.family_name}`}</Text>
          <Text style={{ color: 'gray', fontSize: 16 }}>{user.email}</Text>
        </View>
      </View>
    </View>
  );
};

export const MapBottomSheetUserCard = ({
  user,
  marker,
}: {
  user: UserModel;
  marker: MarkerModel;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <AvatarImage
            size={'large'}
            uri={user.avatar ? user.avatar : 'https://picsum.photos/200/300'}
          />
        </View>
        <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
          <Text
            style={{ fontSize: 20 }}>{`${user.name} ${user.family_name}`}</Text>
          <Text style={{ color: 'gray', fontSize: 16 }}>{user.email}</Text>
          <Text style={{ color: 'gray', fontSize: 14 }}>
            {new Date(marker.createdAt).toLocaleDateString('ru')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
