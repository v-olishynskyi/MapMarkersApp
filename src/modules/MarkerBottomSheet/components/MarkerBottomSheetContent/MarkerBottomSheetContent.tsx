/**
 * @namespace MarkerBottomSheetContent
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { MarkerBottomSheetContentProps } from './types';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useStores } from '@store';
import { View, Text } from 'react-native';
import { AnimatedImageLibrary, Button, IconButton, Loader } from '@components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamsList, MarkerManagementModes } from '@navigation';
import { MenuView, NativeActionEvent } from '@react-native-menu/menu';
import { MenuActions } from './types';
import { observer } from 'mobx-react-lite';
import { useDeleteMarker } from '@api/hooks/markers';

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
    markersStore: { setEditableMarker },
    uiStore: { theme },
    userStore: {
      user: { id },
    },
  } = useStores();

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const { mutate: deleteMarker } = useDeleteMarker();

  const isMineMarker = activeMarker?.author_id === id;

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
      <Button label="Повторити" onPress={loadActiveMarker} />
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

  const menuViewActions = [...(isMineMarker ? authorActions : [])];

  const header = (
    <View style={styles.header}>
      <Text style={styles.name}>{activeMarker?.name}</Text>
      <View style={styles.headerActions}>
        <View style={styles.markerActions}>
          {!!menuViewActions.length && (
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
