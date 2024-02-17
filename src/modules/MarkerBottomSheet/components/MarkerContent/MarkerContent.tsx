/**
 * @namespace MarkerContent
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { MarkerContentProps } from './types';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useStores } from '@store';
import { View, Text } from 'react-native';
import { AnimatedImageLibrary, Button, IconButton } from '@components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamsList, MarkerManagementModes } from '@navigation';
import { MenuView, NativeActionEvent } from '@react-native-menu/menu';
import { MenuActions } from './types';
import { observer } from 'mobx-react-lite';
import { useDeleteMarker } from '@api/hooks/markers';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { CacheKey } from '@api/CacheKey';
import { Skeleton } from './components';

/**
 * MarkerContent
 *
 * @memberof
 * @param {MarkerContentProps} params
 *
 * @example
 * // How to use MarkerContent:
 *  <MarkerContent onClose={closeModal} />
 */
const MarkerContent: React.FC<MarkerContentProps> = ({ onClose }) => {
  const styles = useStyles();
  const {
    markersStore: { setEditableMarker, activeMarker, activeMarkerId },
    uiStore: { theme },
    userStore: {
      user: { id },
    },
  } = useStores();

  const queryKey = [CacheKey.Marker, activeMarkerId];

  const isFetchingMarker =
    useIsFetching({
      queryKey,
    }) > 0;
  const queryClient = useQueryClient();

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const { mutate: deleteMarker } = useDeleteMarker();

  const isMyMarker = activeMarker?.author_id === id;

  // const handleShareMarker = React.useCallback(async () => {
  //   Share.shareSingle({
  //     // message: 'asdasdsadsa',
  //     // url: `com.markers.app/marker/${activeMarker?.id}`,
  //     title: 'sadadad',
  //     social: Social.Telegram,
  //   });
  // }, [activeMarker]);
  const editMarker = React.useCallback(() => {
    setEditableMarker(activeMarker!);
    navigate('marker-management', { mode: MarkerManagementModes.EDIT });
  }, [navigate, activeMarker, setEditableMarker]);

  const handlePressMenuAction = async ({ nativeEvent }: NativeActionEvent) => {
    switch (nativeEvent.event) {
      case MenuActions.DELETE: {
        deleteMarker(activeMarkerId);
        break;
      }
      case MenuActions.EDIT: {
        editMarker();
        break;
      }
      default:
        break;
    }
  };

  const loadMarkerError = (
    <>
      <Text style={styles.errorLabel}>Щось пішло не так. Спробуйте ще раз</Text>
      <Button
        label="Повторити"
        onPress={() => queryClient.refetchQueries({ queryKey })}
      />
    </>
  );

  const authorActions = [
    {
      id: MenuActions.DELETE,
      title: 'Видалити',
      attributes: { destructive: true },
      image: 'trash',
    },
    {
      id: MenuActions.EDIT,
      title: 'Редагувати',
      image: 'pencil',
    },
  ];

  const menuViewActions = [...(isMyMarker ? authorActions : [])];

  const header = (
    <View style={styles.header}>
      <Text style={styles.name}>{activeMarker?.name}</Text>
      <View style={styles.headerActions}>
        <View style={styles.markerActions}>
          {Boolean(menuViewActions.length) && (
            <MenuView
              actions={menuViewActions}
              themeVariant={theme}
              onPressAction={handlePressMenuAction}>
              <IconButton icon="ellipsis-horizontal-sharp" />
            </MenuView>
          )}
          <IconButton icon="share-outline" onPress={() => {}} />
        </View>
        <IconButton icon="close" onPress={onClose} />
      </View>
    </View>
  );

  const images = React.useMemo(
    () =>
      activeMarker?.images?.items?.length ? activeMarker.images.items : [],
    [activeMarker?.images],
  );

  const markerInfo = (
    <>
      <Text style={styles.description}>{activeMarker?.description}</Text>
      <AnimatedImageLibrary images={images.map(({ url }) => url)} />
    </>
  );

  return (
    <>
      {activeMarker && !isFetchingMarker && header}
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {activeMarkerId && isFetchingMarker ? (
          <Skeleton />
        ) : activeMarkerId && !isFetchingMarker && !activeMarker ? (
          loadMarkerError
        ) : (
          markerInfo
        )}
      </BottomSheetScrollView>
    </>
  );
};

export default observer(MarkerContent);
