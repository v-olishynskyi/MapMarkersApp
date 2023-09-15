/**
 * @namespace MarkerBottomSheet
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { useStores } from '@store';
import { View, Text, Image } from 'react-native';
import { Button, IconButton, Loader } from '@components';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MapStackParamsList, MarkerManagementModes } from '@navigation';

/**
 * MarkerBottomSheet
 *
 * @memberof
 *
 * @example
 * // How to use MarkerBottomSheet:
 *  <MarkerBottomSheet />
 */
const MarkerBottomSheet: React.FC = () => {
  const styles = useStyles();
  const {
    mapStore: {
      isLoadingMarker,
      clearActiveMarker,
      activeMarker,
      activeMarkerId,
      loadActiveMarker,
    },
    markersStore: { setEditableMarker },
  } = useStores();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<MapStackParamsList>>();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ['15%', '50%', '95%'], []);

  const openModal = React.useCallback(() => sheetRef.current?.present(), []);
  const closeModal = React.useCallback(() => sheetRef.current?.dismiss(), []);
  const onDismiss = React.useCallback(clearActiveMarker, [clearActiveMarker]);
  // const handleShareMarker = React.useCallback(async () => {
  //   Share.shareSingle({
  //     // message: 'asdasdsadsa',
  //     // url: `com.markers.app/marker/${activeMarker?.id}`,
  //     title: 'sadadad',
  //     social: Social.Telegram,
  //   });
  // }, [activeMarker]);
  const onPressEditButton = React.useCallback(() => {
    setEditableMarker(activeMarker!);
    navigate('marker-management', { mode: MarkerManagementModes.EDIT });
  }, [navigate, activeMarker, setEditableMarker]);

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={2}
        disappearsOnIndex={1}
        pressBehavior={'collapse'}
      />
    ),
    [],
  );

  const content = React.useMemo(() => {
    const header = (
      <View style={styles.header}>
        <Text style={styles.name}>{activeMarker?.name}</Text>
        <View style={styles.headerActions}>
          <IconButton icon="pencil" onPress={onPressEditButton} />
          <IconButton icon="share-outline" onPress={() => {}} />
          <IconButton icon="close" onPress={closeModal} />
        </View>
      </View>
    );

    const error = (
      <>
        <Text style={styles.errorLabel}>
          Щось пішло не так. Спробуйте ще раз
        </Text>
        <Button label="Повторити" onPress={loadActiveMarker} />
      </>
    );

    const markerInfo = (
      <>
        <BottomSheetFlatList
          horizontal
          data={
            activeMarker
              ? [
                  ...activeMarker.images,
                  ...activeMarker.images,
                  ...activeMarker.images,
                ]
              : []
          }
          renderItem={({ item: url }) => (
            <Image
              style={{ width: 60, height: 60, borderRadius: 8 }}
              source={{ uri: url }}
            />
          )}
          style={{
            marginHorizontal: -12,
            paddingLeft: 12,
            paddingRight: 24,
          }}
          contentContainerStyle={{ gap: 12 }}
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
            error
          ) : (
            markerInfo
          )}
        </BottomSheetScrollView>
      </>
    );
  }, [
    isLoadingMarker,
    activeMarker,
    activeMarkerId,
    loadActiveMarker,
    styles.errorLabel,
    styles.header,
    styles.headerActions,
    styles.contentContainer,
    styles.name,
    closeModal,
    onPressEditButton,
  ]);

  React.useEffect(
    () => (activeMarkerId ? openModal() : closeModal()),
    [activeMarkerId, closeModal, openModal],
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}>
      {content}
    </BottomSheetModal>
  );
};

export default observer(MarkerBottomSheet);
