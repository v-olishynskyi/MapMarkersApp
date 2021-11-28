import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import { GoogleMapsMain } from '../../components/map';
import * as MobX from 'mobx-react-lite';
import MapView, { LatLng, MapEvent } from 'react-native-maps';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';
import { hasLocationPermission } from '../../utils/locationPermissions';
import { Minus, Plus } from '../../components/map/ZoomButton';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { NewMarkerModal } from '../../components/modals/Modals';
import { hooks } from '../../hooks';
import { generateId } from '../../utils/generateUUID';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MarkerModel } from '../../models/MarkerModel';
import {
  CalloutUserCard,
  MapBottomSheetUserCard,
} from '../../components/cards/UserCards';
import { parseAddress } from '../../utils/parseAddress';
import Geocoder from 'react-native-geocoding';
import { GeocoderResponse } from '../../types';
import { MarkerDetailBottomCard } from '../../components/bottomsheet/BottomSheetCards';
import { BlurView } from '@react-native-community/blur';

const INITIAL_REGION = {
  latitude: 52.5,
  longitude: 19.2,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const MapScreen = () => {
  const isFocused = useIsFocused();

  const { markerStore, dataStore, mainStore } = hooks.useStores();

  const [markers, setMarkers] = React.useState(mainStore.user?.markers);
  const [isAddingNewMarker, setIsAddingNewMarker] = React.useState(false);
  const [showNewMarkerModal, setShowNewMarkerModal] = React.useState(false);
  const [isLoadingSaveMarker, setIsLoadingSaveMarker] = React.useState(false);
  const [blur, setBlur] = React.useState(false);
  const [isDirection, setIsDirection] = React.useState(false);

  const [activeMarker, setActiveMarker] = React.useState<MarkerModel | null>(
    null,
  );

  const mapViewRef = React.useRef<MapView>(null);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const snapPoints = React.useMemo(() => ['25%', '50%', '80%'], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index !== -1) {
      setBlur(true);
    } else {
      setBlur(false);
    }
  }, []);

  // const offset = useSharedValue(-100);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateY: offset.value }],
  //   };
  // });

  const focus = (coordinate: LatLng) => {
    try {
      mapViewRef.current?.animateCamera(
        { center: coordinate, zoom: 15 },
        { duration: 1000 },
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePressMarker = (
    event: MapEvent<{
      action: 'marker-press';
      id: string;
    }>,
  ) => {
    const { coordinate } = event.nativeEvent;

    const marker = markers.find(
      item =>
        item.latitude === coordinate.latitude &&
        item.longitude === coordinate.longitude,
    );

    if (!marker) {
      return;
    }
    focus(coordinate);
  };

  const handlePressPlus = async () => {
    const lastRegion = await mapViewRef.current?.getCamera();

    lastRegion!.zoom = lastRegion!.zoom + 1;
    mapViewRef.current?.animateCamera(lastRegion!, { duration: 500 });
  };

  const handlePressMinus = async () => {
    const lastRegion = await mapViewRef.current?.getCamera();

    lastRegion!.zoom = lastRegion!.zoom - 1;
    mapViewRef.current?.animateCamera(lastRegion!, { duration: 500 });
  };

  useFocusEffect(
    React.useCallback(() => {
      hasLocationPermission();
    }, []),
  );

  React.useEffect(() => {
    if (!isFocused) {
      markerStore.remove();
    }
  }, [isFocused]);

  const cancelCheck = () => {
    Alert.alert('', 'Ви дійсно хочете відмінити додавання нового маркеру?', [
      {
        text: 'Так',
        onPress: cancelAddingNewMarker,
      },
      { text: 'Ні', onPress: () => {} },
    ]);
  };

  const cancelAddingNewMarker = () => {
    // offset.value = withSpring(-100);
    setIsAddingNewMarker(false);
    showNewMarkerModal && setShowNewMarkerModal(false);
    markerStore.remove();
  };

  const startAddingNewMarker = () => {
    // offset.value = withSpring(0);
    setIsAddingNewMarker(true);
  };

  const handlePressSaveMarker = async () => {
    try {
      setIsLoadingSaveMarker(true);
      const newMarker = await MarkerModel.create({
        ...markerStore.marker,
        ownerID: mainStore.user!.id,
      });

      const marker = new MarkerModel(newMarker.data.marker);

      dataStore.markers.push(marker);
      mainStore.user?.markers.push(marker);

      setIsLoadingSaveMarker(false);
      setShowNewMarkerModal(false);
      cancelAddingNewMarker();
    } catch (error) {
      console.log('handlePressSaveMarker error', { error });
      setIsLoadingSaveMarker(false);
    }
  };

  const changeActiveMarker = async (marker: MarkerModel) => {
    return Promise.resolve(setActiveMarker(marker));
  };

  const onPressMarkerCallout = async (marker: MarkerModel) => {
    try {
      await changeActiveMarker(marker);

      bottomSheetRef.current?.snapToIndex(2);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePressAddress = (marker: MarkerModel) => {
    console.log('maaasdsadsa', marker);
  };

  return (
    <MobX.Observer
      render={() => (
        <>
          <View style={styles.container}>
            <GoogleMapsMain
              ref={mapViewRef}
              initialRegion={INITIAL_REGION}
              onMarkerPress={handlePressMarker}
              onPress={e => {
                if (isAddingNewMarker) {
                  markerStore.marker.setCoordinates(e.nativeEvent.coordinate);
                  setShowNewMarkerModal(true);
                }
              }}
              markers={markers}
              handlePressMarkerCallout={onPressMarkerCallout}
              isDirection={isDirection}
            />
            {/* <Animated.View
              style={[styles.addingNewMarkerPanel, animatedStyles]}>
              <Text style={[styles.addingNewMarkerTitle]}>
                Встановіть точку на карті
              </Text>
            </Animated.View> */}
            <View style={[styles.addingNewMarkerButton]}>
              <Button
                title={isAddingNewMarker ? 'Відмінити' : 'Додати новий маркер'}
                raised
                onPress={isAddingNewMarker ? cancelCheck : startAddingNewMarker}
              />
            </View>
            <Plus
              containerStyle={styles.plusButtonContainer}
              onPress={handlePressPlus}
            />
            <Minus
              containerStyle={styles.minusButtonContainer}
              onPress={handlePressMinus}
            />
          </View>
          {showNewMarkerModal && (
            <NewMarkerModal
              visible={showNewMarkerModal}
              onDismiss={cancelCheck}
              handlePressSave={handlePressSaveMarker}
              handleChangeName={markerStore.marker.setName}
              handleChageDescription={markerStore.marker.setDescription}
              handleChangeCoordinates={markerStore.marker.setCoordinates}
              loading={isLoadingSaveMarker}
              disabled={isLoadingSaveMarker}
              name={markerStore.marker.name}
              description={markerStore.marker.description}
              coordinates={markerStore.marker.coordinatesString}
            />
          )}
          {activeMarker !== null && (
            <BottomSheet
              ref={bottomSheetRef}
              enablePanDownToClose
              index={-1}
              style={{ marginHorizontal: 15 }}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backdropComponent={() => (
                <>
                  {blur && (
                    <BlurView
                      style={{ flex: 1 }}
                      blurType="dark"
                      blurAmount={10}
                      reducedTransparencyFallbackColor="white"
                    />
                  )}
                </>
              )}>
              <BottomSheetScrollView>
                <MarkerDetailBottomCard
                  marker={activeMarker}
                  containerStyle={{ marginHorizontal: 16 }}
                  onPressAddress={handlePressAddress}
                />
              </BottomSheetScrollView>
            </BottomSheet>
          )}
        </>
      )}
    />
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  plusButtonContainer: { position: 'absolute', top: 450, right: 10 },
  minusButtonContainer: { position: 'absolute', top: 500, right: 10 },
  addingNewMarkerPanel: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 8,
    right: 8,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addingNewMarkerTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  addingNewMarkerButton: { marginBottom: 20 },
});
