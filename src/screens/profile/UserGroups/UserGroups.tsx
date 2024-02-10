import React from 'react';
import { BaseList } from '@components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamsList } from '@navigation';
import { ListRenderItem, Text, View } from 'react-native';
import { generalStyles } from '@styles';
import { useGroups } from '@api/hooks/groups';
import { useStores } from '@store';
import { GroupModel } from '@models';
import { Group } from '@common/types/entities';
import GroupItem from '../../community/CommunityTab/screens/Groups/components/GroupItem/GroupItem';
import { GroupsFilterBy } from '@services/groups';

const UserGroups = () => {
  const { params } = useRoute<RouteProp<AppStackParamsList, 'user-groups'>>();
  const {
    userStore: { user },
  } = useStores();

  const isMe = params.userId === user.id;

  const {
    data,
    isLoading,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGroups({
    limit: 20,
    filter_by: isMe ? GroupsFilterBy.My_Groups : GroupsFilterBy.By_User,
    user_id: isMe ? undefined : params.userId,
  });

  const groups = React.useMemo(
    () =>
      data?.pages
        .reduce((arr, page) => [...arr, ...page.data], [] as Group[])
        .map(group => new GroupModel(group)),
    [data?.pages],
  );

  const renderItem: ListRenderItem<GroupModel> = ({ item: group }) => {
    return <GroupItem group={group} onPress={() => {}} />;
  };

  return (
    <BaseList
      data={groups}
      renderItem={renderItem}
      isLoading={isLoading}
      onRefresh={refetch}
    />
  );
};

export default UserGroups;
