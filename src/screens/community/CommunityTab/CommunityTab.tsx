/**
 * @namespace Users
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { NavigationType } from './types';
import { observer } from 'mobx-react-lite';
import { useStores } from '@store';
import { ListRenderItem, View } from 'react-native';
import { UserModel } from '@models';
import { UserItem, UserSkeleton } from './components';
import { BaseList, Input } from '@components';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';
import { useDebouncedCallback } from 'use-debounce';
import { useIsMounted } from '@common/hooks';

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
 * CommunityTab
 *
 *
 * @memberof
 * @param {CommunityTabProps} params
 *
 * @example
 * // How to use Community:
 *  <CommunityTab />
 */
const CommunityTab: React.FC = () => {
  const { colors } = getTheme();
  const styles = useStyles();
  const navigation = useNavigation<NavigationType>();
  const isMounted = useIsMounted();

  const {
    communityStore: {
      initialLoadData,
      isLoading,
      data,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
      search,
      setSearch,
    },
    profileViewStore: { setUserId },
  } = useStores();

  const debouncedLoad = useDebouncedCallback(() => {
    if (isMounted) {
      loadUsers(search);
    }
  }, 1000);

  const onPress = React.useCallback(
    (user: UserModel) => {
      setUserId(user.id);
      navigation.navigate('profile-view', { userId: user.id });
    },
    [navigation, setUserId],
  );

  const loadUsers = React.useCallback(
    (searchValue?: string, silent?: boolean) =>
      initialLoadData(0, 20, searchValue, silent),
    [initialLoadData],
  );

  const renderItem: ListRenderItem<UserModel> = React.useCallback(
    ({ item: user }) => <UserItem user={user} onPress={() => onPress(user)} />,
    [onPress],
  );

  React.useEffect(() => {
    debouncedLoad();
  }, [search, debouncedLoad]);

  React.useEffect(() => {
    loadUsers();
  }, [loadUsers]);

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
        data={data}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        onRefresh={() => loadUsers(search, true)}
        onEndReached={() => hasNextPage && fetchNextPage()}
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        loader={skeleton}
      />
    </View>
  );
};

export default observer(CommunityTab);
