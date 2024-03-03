/**
 * @namespace Groups
 * @category Community tab
 * @subcategory tab screen
 *  */
import React from 'react';
import { useGroups } from '@api/hooks/groups';
import { Group } from '@common/types/entities';
import { GroupModel } from '@models';
import { CommunityList } from '../../components';
import { ListRenderItem } from 'react-native';
import { GroupItem } from '@components';

/**
 * Groups
 *
 * @memberof
 * @param {GroupsProps} params
 *
 * @example
 * // How to use Groups:
 *  <Groups />
 */
const Groups: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const {
    data,
    isLoading,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGroups({ limit: 20 });

  const groups = React.useMemo(
    () =>
      data?.pages
        .reduce((arr, page) => [...arr, ...page.data], [] as Group[])
        .map(group => new GroupModel(group)),
    [data?.pages],
  );

  const renderItem: ListRenderItem<GroupModel> = ({ item: group }) => {
    return <GroupItem group={group} />;
  };

  return (
    <CommunityList<GroupModel>
      data={groups || []}
      search={search}
      setSearch={setSearch}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      refetch={refetch}
      renderItem={renderItem}
    />
  );
};

export default Groups;
