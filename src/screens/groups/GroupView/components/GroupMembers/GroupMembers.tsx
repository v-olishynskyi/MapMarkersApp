/**
 * @namespace GroupMembers
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { GroupMembersProps } from './types';
import { AvatarGroup, Pressable } from '@components';
import { Text } from 'react-native';
import { generalStyles } from '@styles';

/**
 * GroupMembers
 *
 * @memberof
 * @param {GroupMembersProps} params
 *
 * @example
 * // How to use GroupMembers:
 *  <GroupMembers />
 */
const GroupMembers: React.FC<GroupMembersProps> = ({
  membersCount,
  avatars,
}) => {
  const styles = useStyles();

  const goToGroupMembersList = () => {};

  return (
    <Pressable
      style={[generalStyles.row, styles.container]}
      onPress={goToGroupMembersList}>
      <Text style={styles.count}>{membersCount} учасників</Text>
      <AvatarGroup avatars={avatars} />
    </Pressable>
  );
};

export default GroupMembers;
