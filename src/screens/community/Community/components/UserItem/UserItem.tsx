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
const UserItem: React.FC<UserItemProps> = ({ user, onPress }) => {
  const styles = useStyles();

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
