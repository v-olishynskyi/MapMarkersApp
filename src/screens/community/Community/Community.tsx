/**
 * @namespace Users
 * @category
 * @subcategory
 *  */
import React, { useCallback, useEffect } from 'react';
import useStyles from './styles';
import { CommunityProps, NavigationType } from './types';
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
 * Community
 *
 *
 * @memberof
 * @param {CommunityProps} params
 *
 * @example
 * // How to use Community:
 *  <Community />
 */
const Community: React.FC<CommunityProps> = () => {
  const { colors } = getTheme();
  const styles = useStyles();
  const navigation = useNavigation<NavigationType>();
  const isMounted = useIsMounted();

  const [searchValue, setSearchValue] = React.useState('');

  const {
    communityStore: {
      initialLoadData,
      isLoading,
      data,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
    },
    profileViewStore: { setUserId },
  } = useStores();

  const debouncedLoad = useDebouncedCallback(() => {
    isMounted && loadUsers(searchValue);
  }, 1000);

  const onPress = React.useCallback(
    (user: UserModel) => {
      setUserId(user.id);
      navigation.navigate('profile-view', { userId: user.id });
    },
    [navigation, setUserId],
  );

  const loadUsers = React.useCallback(
    (search?: string, silent?: boolean) =>
      initialLoadData(0, 20, search, silent),
    [initialLoadData],
  );

  const renderItem: ListRenderItem<UserModel> = useCallback(
    ({ item: user }) => <UserItem user={user} onPress={() => onPress(user)} />,
    [onPress],
  );

  useEffect(() => {
    debouncedLoad();
  }, [searchValue, debouncedLoad, isMounted]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Пошук"
          value={searchValue}
          onChangeText={setSearchValue}
          leftIcon={<Icon name="search" size={16} color={colors.gray} />}
          clearButtonMode="while-editing"
        />
      </View>
      <BaseList
        data={data}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        onRefresh={() => loadUsers(searchValue, true)}
        onEndReached={() => hasNextPage && fetchNextPage()}
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        loader={skeleton}
      />
    </View>
  );
};

export default observer(Community);
