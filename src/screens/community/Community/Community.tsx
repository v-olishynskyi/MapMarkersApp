/**
 * @namespace Users
 * @category
 * @subcategory
 *  */
import React, { useEffect } from 'react';
import useStyles from './styles';
import { CommunityProps } from './types';
import { observer } from 'mobx-react-lite';
import { useStores } from '@store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';
import { UserModel } from '@models';
import { UserItem } from './components';

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
      loadData,
      isLoading,
      data,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
    },
  } = useStores();

  const loadUsers = React.useCallback(() => loadData(0, 10), [loadData]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const renderItem: ListRenderItem<UserModel> = ({ item: user }) => (
    <UserItem user={user} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList<UserModel>
        ListHeaderComponent={isLoading ? <ActivityIndicator /> : null}
        refreshing={isFetchingNextPage}
        onEndReached={() => {
          hasNextPage && fetchNextPage();
        }}
        onEndReachedThreshold={0.1}
        onRefresh={loadUsers}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
};

export default observer(Community);
