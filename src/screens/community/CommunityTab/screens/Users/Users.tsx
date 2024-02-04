/**
 * @namespace Users
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { NavigationType } from './types';
import { getTheme } from '@common/helpers';
import { useNavigation } from '@react-navigation/native';
import { UserModel } from '@models';
import { ListRenderItem, View } from 'react-native';
import { UserItem, UserSkeleton } from './components';
import { BaseList, Input } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUsers } from '@api/hooks/users';
import { CommunityUser } from '@services/users';

const skeleton = (
  <>
    {Array(20)
      .fill(undefined)
      .map((_, index) => (
        <UserSkeleton key={index} />
      ))}
  </>
);

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
  const { colors } = getTheme();
  const styles = useStyles();
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
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Пошук"
          value={search}
          onChangeText={setSearch}
          leftIcon={<Icon name="search" size={16} color={colors.gray} />}
          clearButtonMode="while-editing"
        />
      </View>
      <BaseList
        data={users}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        onRefresh={refetch}
        onEndReached={() => hasNextPage && fetchNextPage()}
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        loader={skeleton}
      />
    </View>
  );
};

export default Users;
