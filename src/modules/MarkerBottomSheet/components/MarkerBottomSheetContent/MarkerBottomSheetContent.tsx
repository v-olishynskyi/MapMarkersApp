/**
 * @namespace MarkerBottomSheetContent
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { MarkerBottomSheetContentProps } from './types';
import {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { useStores } from '@store';
import { View, Text, Image } from 'react-native';
import { Button, IconButton, Loader } from '@components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamsList, MarkerManagementModes } from '@navigation';
import { MenuView, NativeActionEvent } from '@react-native-menu/menu';
import { MenuActions } from './types';
import { ListRenderItem } from 'react-native';
import { PublicFile } from '@common/types/entities';
import { observer } from 'mobx-react-lite';

/**
 * MarkerBottomSheetContent
 *
 * @memberof
 * @param {MarkerBottomSheetContentProps} params
 *
 * @example
 * // How to use MarkerBottomSheetContent:
 *  <MarkerBottomSheetContent onClose={closeModal} />
 */
const MarkerBottomSheetContent: React.FC<MarkerBottomSheetContentProps> = ({
  onClose,
}) => {
  const styles = useStyles();
  const {
    mapStore: {
      isLoadingMarker,
      activeMarker,
      activeMarkerId,
      loadActiveMarker,
    },
    markersStore: { setEditableMarker, removeMarker },
    uiStore: { theme },
  } = useStores();

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

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
    if (nativeEvent.event === MenuActions.DELETE) {
      await removeMarker(activeMarkerId);
    } else if (nativeEvent.event === MenuActions.EDIT) {
      editMarker();
    }
  };

  const renderMarkerImage: ListRenderItem<PublicFile> = React.useCallback(
    ({ item: { url } }) => (
      <Image style={styles.markerImage} source={{ uri: url }} />
    ),
    [styles.markerImage],
  );

  const loadMarkerError = (
    <>
      <Text style={styles.errorLabel}>Щось пішло не так. Спробуйте ще раз</Text>
      <Button label="Повторити" onPress={loadActiveMarker} />
    </>
  );

  const header = (
    <>
      <View style={styles.header}>
        <Text style={styles.name}>{activeMarker?.name}</Text>
        <View style={styles.headerActions}>
          <View style={styles.markerActions}>
            <MenuView
              actions={[
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
              ]}
              themeVariant={theme}
              onPressAction={handlePressMenuAction}>
              <IconButton icon="ellipsis-horizontal-sharp" />
            </MenuView>
            <IconButton icon="share-outline" onPress={() => {}} />
          </View>
          <IconButton icon="close" onPress={onClose} />
        </View>
      </View>
    </>
  );

  const data = activeMarker?.images?.items?.length
    ? activeMarker.images.items
    : [];

  const markerInfo = (
    <>
      <Text style={styles.description}>{activeMarker?.description}</Text>

      <BottomSheetFlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderMarkerImage}
        style={styles.markerImageList}
        contentContainerStyle={styles.markerImageListContent}
      />
    </>
  );

  return (
    <>
      {activeMarker && header}
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {activeMarkerId && isLoadingMarker ? (
          <Loader size={'large'} />
        ) : activeMarkerId && !isLoadingMarker && !activeMarker ? (
          loadMarkerError
        ) : (
          markerInfo
        )}
      </BottomSheetScrollView>
    </>
  );
};

export default observer(MarkerBottomSheetContent);
