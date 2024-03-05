/**
 * @namespace GroupMembers
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { GroupMembersProps } from './types';
import { AvatarGroup, Pressable } from '@components';
import { Text, View } from 'react-native';
import { generalStyles } from '@styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';

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
  isJoined,
}) => {
  const { colors } = getTheme();
  const styles = useStyles();

  const goToGroupMembersList = () => {};

  return (
    <Pressable
      style={[generalStyles.row, styles.container]}
      onPress={goToGroupMembersList}>
      <Text style={styles.count}>{membersCount} учасників</Text>
      <AvatarGroup avatars={avatars} />
      {isJoined && (
        <View style={[generalStyles.row, styles.joinStatusContainer]}>
          <Icon name="checkmark-circle-outline" color={colors.gray} size={14} />
          <Text style={styles.joinStatus}>Ви є учасником</Text>
        </View>
      )}
    </Pressable>
  );
};

export default GroupMembers;
