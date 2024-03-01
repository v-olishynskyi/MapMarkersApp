import React from 'react';
import { BaseList, Pressable, SortModal } from '@components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamsList } from '@navigation';
import { useMarkersByUser } from '@api/hooks/markers';
import { ListRenderItemInfo } from 'react-native';
import { useStores } from '@store';
import { MarkerItem } from './components';
import { MarkerModel } from '@models';
import useStyles from './styles';
import { MarkersSortBy } from '@services/markers';
import { SortByDirections, SortOption } from '@common/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';

const sortOptions: Array<SortOption> = [
  {
    sort_by: MarkersSortBy.Name,
    direction: SortByDirections.ASC,
    label: 'Назва А-Я',
  },
  {
    sort_by: MarkersSortBy.Name,
    direction: SortByDirections.DESC,
    label: 'Назва Я-А',
  },
  {
    sort_by: MarkersSortBy.UpdatedAt,
    direction: SortByDirections.DESC,
    label: 'Дата - новіші',
  },
  {
    sort_by: MarkersSortBy.UpdatedAt,
    direction: SortByDirections.ASC,
    label: 'Дата - старіші',
  },
];

const UserMarkers = () => {
  const { colors } = getTheme();
  const styles = useStyles();
  const { setOptions } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  const { params } = useRoute<RouteProp<AppStackParamsList, 'user-markers'>>();
  const {
    markersStore: { setActiveMarker, setActiveMarkerId },
  } = useStores();

  const [sortIndex, setSortIndex] = React.useState<number>(0);

  const sort = React.useMemo(() => sortOptions[sortIndex], [sortIndex]);

  const {
    data: markers,
    isFetching,
    refetch,
  } = useMarkersByUser(params.userId, sort);

  const sortModalRef = React.useRef<SortModal>(null);
  const openSortModal = () => sortModalRef.current?.open();

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<MarkerModel>) => {
      const onPress = () => {
        setActiveMarkerId(item.id);
        setActiveMarker(item);
      };
      return (
        <MarkerItem
          marker={item}
          onPress={onPress}
          style={styles.itemContainer}
        />
      );
    },
    [setActiveMarker, setActiveMarkerId, styles.itemContainer],
  );

  const sortButton = React.useCallback(
    () => (
      <Pressable onPress={openSortModal}>
        <Icon name="swap-vertical" size={24} color={colors.primary} />
      </Pressable>
    ),
    [colors.primary],
  );

  React.useEffect(() => {
    setOptions({
      headerRight: sortButton,
    });
  }, [setOptions, sortButton]);

  return (
    <>
      <BaseList
        data={markers}
        renderItem={renderItem}
        isLoading={isFetching}
        onRefresh={refetch}
        contentContainerStyle={styles.contentContainer}
        style={styles.listContainer}
      />
      <SortModal
        ref={sortModalRef}
        sortOptions={sortOptions}
        sortIndex={sortIndex}
        setSortIndex={setSortIndex}
      />
    </>
  );
};

export default React.memo(UserMarkers);
