/**
 * @namespace CommunityList
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { CommunityListProps } from './types';
import { View } from 'react-native';
import { BaseList, Input } from '@components';
import { getTheme } from '@common/helpers';
import { Skeleton } from './components';
import Icon from 'react-native-vector-icons/Ionicons';

const skeleton = (
  <>
    {Array(20)
      .fill(undefined)
      .map((_, index) => (
        <Skeleton key={index} />
      ))}
  </>
);

/**
 * CommunityList
 *
 * @memberof
 * @param {CommunityListProps} params
 *
 * @example
 * // How to use CommunityList:
 *  <CommunityList />
 */
function CommunityList<T>({
  data,
  search,
  setSearch,
  isLoading,
  isFetchingNextPage,
  refetch,
  hasNextPage,
  fetchNextPage,
  renderItem,
}: CommunityListProps<T>) {
  const styles = useStyles();
  const { colors } = getTheme();

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
        onRefresh={refetch}
        onEndReached={() => hasNextPage && fetchNextPage()}
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        loader={skeleton}
      />
    </View>
  );
}

export default CommunityList;
