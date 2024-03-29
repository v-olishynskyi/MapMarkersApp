/**
 * @namespace GroupItem
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { GroupItemProps } from './types';
import { Avatar, Pressable } from '@components';
import { generalStyles } from '@styles';
import { Text, View } from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { GroupActionButton } from './components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamsList } from '@navigation';

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
const GroupItem: React.FC<GroupItemProps> = ({ group }) => {
  const styles = useStyles();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const {
    userStore: { user },
  } = useStores();

  const isOwner = group.owner_id === user.id;

  const goToGroupView = React.useCallback(
    () => navigate('group-view', { groupId: group.id }),
    [navigate, group.id],
  );

  return (
    <Pressable
      style={[generalStyles.row, styles.container]}
      onPress={goToGroupView}>
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
              Адміністратор:{' '}
              <Text style={[styles.createdBy, styles.author]}>
                {group.owner.fullname}
              </Text>
            </Text>
            <Text style={[styles.members]}>
              Учасників: {group.members.items.length}
            </Text>
          </View>
        </View>
        <GroupActionButton group={group} isOwner={isOwner} />
      </View>
    </Pressable>
  );
};

export default React.memo(observer(GroupItem));
