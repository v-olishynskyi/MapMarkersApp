/**
 * @namespace BaseList
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { BaseListProps } from './types';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { generalStyles } from '@styles';
import { LoaderRefresh } from '@components';

/**
 * BaseList
 *
 * @memberof SharedComponents
 * @param {BaseListProps} params
 *
 * @example
 * // How to use BaseList:
 *  <BaseList data={data} renderItem={({item}, index) => <View></View} />
 */
const BaseList = React.forwardRef<FlatList, BaseListProps>((props, ref) => {
  const styles = useStyles();

  const {
    data,
    isFetchingNextPage,
    isLoading,
    onEndReached,
    onRefresh,
    enableRefresh = true,
    loader,
    ...rest
  } = props;

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const Footer = () => (
    <View style={[generalStyles.row, styles.footerContainer]}>
      <ActivityIndicator size="small" />
    </View>
  );

  React.useEffect(() => {
    if (data && data.length) {
      setIsRefreshing(false);
    }
  }, [data]);

  const loaderComponent = loader || (
    <ActivityIndicator size={'large'} style={styles.loader} animating />
  );

  const listEmptyComponent = (
    <Text style={styles.emptyComponentLabel}>Дані відсутні</Text>
  );

  return isLoading ? (
    loaderComponent
  ) : (
    <FlatList
      ref={ref}
      data={data}
      onEndReached={() => {
        if (!isFetchingNextPage && !isLoading) {
          onEndReached && onEndReached();
        }
      }}
      onEndReachedThreshold={0.8}
      refreshing={isRefreshing}
      ListEmptyComponent={
        isLoading
          ? loaderComponent
          : rest.ListEmptyComponent || listEmptyComponent
      }
      {...rest}
      ListFooterComponent={
        !isLoading && !isRefreshing && isFetchingNextPage ? <Footer /> : null
      }
      refreshControl={
        enableRefresh ? (
          <LoaderRefresh
            isRefreshing={isRefreshing}
            onRefresh={async () => {
              setIsRefreshing(true);
              await onRefresh?.();
              setIsRefreshing(false);
            }}
          />
        ) : undefined
      }
    />
  );
});

export default BaseList;
