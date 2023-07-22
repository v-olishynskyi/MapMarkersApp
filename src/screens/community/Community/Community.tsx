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
import { BaseList } from '@components';
import { useNavigation } from '@react-navigation/native';

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
  const styles = useStyles();
  const navigation = useNavigation<NavigationType>();

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

  return (
    <View style={styles.container}>
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
