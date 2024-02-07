/**
 * @namespace Users
 * @category Community tab
 * @subcategory tab screen
 *  */
import React from 'react';
import { NavigationType } from './types';
import { useNavigation } from '@react-navigation/native';
import { UserModel } from '@models';
import { ListRenderItem } from 'react-native';
import { UserItem } from './components';
import { useUsers } from '@api/hooks/users';
import { CommunityUser } from '@services/users';
import { CommunityList } from '../../components';

/**
 * Users
 *
 * @memberof
 * @param {UsersProps} params
 *
 * @example
 * // How to use Users:
 *  <Users />
 */
const Users: React.FC = () => {
  const navigation = useNavigation<NavigationType>();

  const [search, setSearch] = React.useState('');

  const {
    data,
    isLoading,
    isFetchingNextPage,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useUsers({ limit: 20, page: 1 });

  const users = React.useMemo(
    () =>
      data?.pages
        .reduce((arr, page) => [...arr, ...page.data], [] as CommunityUser[])
        .map(item => new UserModel(item)),
    [data?.pages],
  );

  const onPress = React.useCallback(
    (user: UserModel) => {
      navigation.navigate('profile-view', { userId: user.id });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<UserModel> = React.useCallback(
    ({ item: user }) => <UserItem user={user} onPress={() => onPress(user)} />,
    [onPress],
  );

  return (
    <CommunityList<UserModel>
      data={users || []}
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

export default Users;
