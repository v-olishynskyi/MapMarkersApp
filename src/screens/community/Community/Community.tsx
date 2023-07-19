/**
 * @namespace Users
 * @category
 * @subcategory
 *  */
import React, { useCallback, useEffect } from 'react';
import useStyles from './styles';
import { CommunityProps } from './types';
import { observer } from 'mobx-react-lite';
import { useStores } from '@store';
import { ListRenderItem, View } from 'react-native';
import { UserModel } from '@models';
import { UserItem } from './components';
import { BaseList } from '@components';

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

  const {
    communityStore: {
      initialLoadData,
      isLoading,
      data,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
    },
  } = useStores();

  const loadUsers = React.useCallback(
    () => initialLoadData(0, 20),
    [initialLoadData],
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const renderItem: ListRenderItem<UserModel> = useCallback(
    ({ item: user }) => <UserItem user={user} />,
    [],
  );

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
