/**
 * @namespace GroupItem
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { GroupItemProps } from './types';
import { Avatar, Button, Pressable } from '@components';
import { generalStyles } from '@styles';
import { Text, View } from 'react-native';
import { getTheme } from '@common/helpers';
import { ButtonProps } from '@components/common/Button/types';
import { useJoinGroup, useLeaveGroup } from '@api/hooks/groups';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';

/**
 * GroupItem
 *
 *
 * @memberof
 * @param {GroupItemProps} params
 *
 * @example
 * // How to use GroupItem:
 *  <GroupItem group={group} onPress={() => {}} />
 */
const GroupItem: React.FC<GroupItemProps> = ({ group, onPress }) => {
  const styles = useStyles();
  const { colors } = getTheme();

  const {
    userStore: { user },
  } = useStores();

  const { mutate: join, isPending: isJoining } = useJoinGroup(group.id);
  const { mutate: leave, isPending: isLeaving } = useLeaveGroup(group.id);

  const params = { group_id: group.id, user_id: user.id };

  const buttonProps: ButtonProps = group.is_member
    ? {
        label: 'Вийти',
        backgroundColor: colors.red,
        onPress: () => leave(params),
      }
    : {
        label: 'Приєднатися',
        backgroundColor: colors.green,
        onPress: () => join(params),
      };

  return (
    <Pressable style={[generalStyles.row, styles.container]} onPress={onPress}>
      <Avatar
        size={50}
        fullname={group.name}
        initials={group.name[0]}
        url={group.avatar?.url}
        containerStyle={styles.avatar}
      />
      <View style={[generalStyles.rowBetween, styles.contentContainer]}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.groupName}>{group.name}</Text>
          <View style={styles.groupInfo}>
            <Text style={styles.createdBy}>
              Created by{' '}
              <Text style={[styles.createdBy, styles.author]}>
                {group.owner.fullname}
              </Text>
            </Text>
            <Text style={[styles.members]}>
              Учасників: {group.members.items.length}
            </Text>
          </View>
        </View>
        <Button
          {...buttonProps}
          loading={isJoining || isLeaving}
          size="xSmall"
        />
      </View>
    </Pressable>
  );
};

export default React.memo(observer(GroupItem));
