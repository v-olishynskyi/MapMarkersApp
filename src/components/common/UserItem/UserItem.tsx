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
 *  <UserItem user={user} onPress={() => {}} />
 */
const UserItem: React.FC<UserItemProps> = ({
  user,
  onPress,
  size = 'normal',
  style,
}) => {
  const styles = useStyles(size);

  const isSmall = size === 'small';

  const userData = (
    <>
      <Avatar
        size={isSmall ? 32 : 40}
        fullname={user.fullname}
        initials={user.initials}
        url={user.avatar_url}
        containerStyle={styles.avatar}
      />
      <View>
        <Text style={styles.fullname}>{user.fullname}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </>
  );

  return onPress ? (
    <Pressable
      style={[generalStyles.row, styles.container, style]}
      onPress={onPress}>
      {userData}
    </Pressable>
  ) : (
    <View style={[generalStyles.row, styles.container, style]}>{userData}</View>
  );
};

export default React.memo(UserItem);
