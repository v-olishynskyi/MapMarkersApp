/**
 * @namespace GroupActionButton
 * @category
 * @subcategory
 *  */
import React from 'react';
import { GroupActionButtonProps, GroupActions } from './types';
import {
  MenuAction,
  MenuView,
  NativeActionEvent,
} from '@react-native-menu/menu';
import { useStores } from '@store';
import { IconButton } from '@components';
import { useJoinGroup, useLeaveGroup } from '@api/hooks/groups';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamsList } from '@navigation';

const editAction: MenuAction = {
  id: GroupActions.EDIT,
  title: 'Редагувати',
  image: 'pencil',
};
const joinAction: MenuAction = {
  id: GroupActions.JOIN,
  title: 'Приєднатися',
  image: 'plus',
};
const leaveAction: MenuAction = {
  id: GroupActions.LEAVE,
  title: 'Вийти',
  image: 'minus',
};

/**
 * GroupActionButton
 *
 * @memberof
 * @param {GroupActionButtonProps} params
 *
 * @example
 * // How to use GroupActionButton:
 *  <GroupActionButton group={group} isOwner={isOwner} />
 */
const GroupActionButton: React.FC<GroupActionButtonProps> = ({
  group,
  isOwner,
}) => {
  const {
    uiStore: { theme },
    userStore: {
      user: { id },
    },
  } = useStores();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const { mutate: join } = useJoinGroup(group.id);
  const { mutate: leave } = useLeaveGroup(group.id);

  const menuActions = [];

  if (isOwner) {
    menuActions.push(editAction);
  } else {
    menuActions.push(group.is_member ? leaveAction : joinAction);
  }

  const goToEditGroup = () => navigate('edit-group', { groupId: group.id });

  const handlePressMenuAction = async ({ nativeEvent }: NativeActionEvent) => {
    switch (nativeEvent.event) {
      case GroupActions.EDIT: {
        goToEditGroup();
        break;
      }
      case GroupActions.JOIN: {
        join({ group_id: group.id, user_id: id });
        break;
      }
      case GroupActions.LEAVE: {
        leave({ group_id: group.id, user_id: id });
        break;
      }
      default:
        break;
    }
  };

  return (
    <MenuView
      actions={menuActions}
      themeVariant={theme}
      onPressAction={handlePressMenuAction}>
      <IconButton icon="ellipsis-horizontal-sharp" />
    </MenuView>
  );
};

export default GroupActionButton;
