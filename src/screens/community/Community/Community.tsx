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
import { UserItem } from './components';
import { BaseList, Input } from '@components';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';
import { useDebouncedCallback } from 'use-debounce';

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
    initialLoadData(0, 20, searchValue);
  }, 1000);

  const onPress = React.useCallback(
    (user: UserModel) => {
      setUserId(user.id);
      navigation.navigate('profile-view', { userId: user.id });
    },
    [navigation, setUserId],
  );

  const loadUsers = React.useCallback(
    () => initialLoadData(0, 20),
    [initialLoadData],
  );

  const renderItem: ListRenderItem<UserModel> = useCallback(
    ({ item: user }) => <UserItem user={user} onPress={() => onPress(user)} />,
    [onPress],
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    debouncedLoad();
  }, [searchValue, debouncedLoad]);

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
        onRefresh={loadUsers}
        onEndReached={() => hasNextPage && fetchNextPage()}
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
      />
    </View>
  );
};

export default observer(Community);
