/**
 * @namespace UserItem
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { UserItemProps } from './types';
import { Avatar, Pressable } from '@components';
import { generalStyles } from '@styles';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamsList } from '@navigation';

/**
 * UserItem
 *
 *
 * @memberof
 * @param {UserItemProps} params
 *
 * @example
 * // How to use UserItem:
 *  <UserItem />
 */
const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const styles = useStyles();

  const onPress = React.useCallback(
    () => navigation.navigate('profile-view', { userId: user.id }),
    [user, navigation],
  );

  return (
    <Pressable style={[generalStyles.row, styles.container]} onPress={onPress}>
      <Avatar
        size={40}
        fullname={user.fullname}
        initials={user.initials}
        url={user.avatar_url}
        containerStyle={styles.avatar}
      />
      <View>
        <Text>{user.fullname}</Text>
        <Text>{user.email}</Text>
      </View>
    </Pressable>
  );
};

export default UserItem;
