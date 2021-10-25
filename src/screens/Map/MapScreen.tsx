import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { CustomMarker, GoogleMapsMain } from '../../components/map';
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

function getRandomLatitude(min = 48, max = 56) {
  return Math.random() * (max - min) + min;
}

function getRandomLongitude(min = 14, max = 24) {
  return Math.random() * (max - min) + min;
}

const INITIAL_REGION = {
  latitude: 52.5,
  longitude: 19.2,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const MapScreen = () => {
  const isFocused = useIsFocused();

  const { markerStore, dataStore, mainStore } = hooks.useStores();

  const [markers, setMarkers] = React.useState(dataStore.markers);
  const [isAddingNewMarker, setIsAddingNewMarker] = React.useState(false);
  const [showNewMarkerModal, setShowNewMarkerModal] = React.useState(false);
  const [isLoadingSaveMarker, setIsLoadingSaveMarker] = React.useState(false);

  let mapViewRef = React.useRef<MapView>(null);

  const offset = useSharedValue(-100);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  const _generateMarkers = count => {
    const _markers = [];

    for (let i = 0; i < count; i++) {
      _markers.push(
        <CustomMarker
          key={i}
          coordinate={{
            latitude: getRandomLatitude(),
            longitude: getRandomLongitude(),
          }}
          title={`Title ${i}`}
          description={`Description marker ${i} - ${
            getRandomLatitude() - getRandomLongitude()
          }`}
        />,
      );
    }

    setMarkers(_markers);
  };

  // const top = viewAnimationRef.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, getStatusBarHeight()],
  // });

  const focus = (coordinate: LatLng) => {
    console.log('click');

    try {
      mapViewRef.current?.animateCamera(
        { center: coordinate, zoom: 12 },
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
      console.log('isFocused', isFocused);

      markerStore.clear();
    }
  }, [isFocused]);

  const askAlert = () => {
    Alert.alert('', 'Ви дійсно хочете відмінити додавання нового маркеру?', [
      {
        text: 'Так',
        onPress: cancelAddingNewMarker,
      },
      { text: 'Ні', onPress: () => {} },
    ]);
  };

  const cancelAddingNewMarker = () => {
    offset.value = withSpring(-100);
    setIsAddingNewMarker(false);
    showNewMarkerModal && setShowNewMarkerModal(false);
    markerStore.remove();
  };

  const startAddingNewMarker = () => {
    offset.value = withSpring(0);
    setIsAddingNewMarker(true);
  };

  const handlePressSaveMarker = async () => {
    try {
      setIsLoadingSaveMarker(true);
      console.log('mamamamama before', markerStore.marker);

      console.log('mamamamama after', markerStore.marker);

      markerStore.marker.setAuthor(mainStore.user!);
      markerStore.marker.setId(generateId());

      dataStore.markers.push(markerStore.marker);
      mainStore.user?.markers.push(markerStore.marker);

      setIsLoadingSaveMarker(false);
      setShowNewMarkerModal(false);
      cancelAddingNewMarker();
    } catch (error) {
      console.log('handlePressSaveMarker error', { error });
      setIsLoadingSaveMarker(false);
    }
  };

  const onChangeMarkerName = (name: string) => {
    markerStore.marker.setName(name);
  };

  const onChangeMarkerDescription = (description: string) => {
    markerStore.marker.setDescription(description);
  };

  const onChangeMarkerCoordinates = (coordinates: LatLng) => {
    markerStore.marker.setCoordinates(coordinates);
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
                } else {
                  focus(e.nativeEvent.coordinate);
                }
              }}
              markers={markers}
            />
            <Animated.View
              style={[styles.addingNewMarkerPanel, animatedStyles]}>
              <Text style={[styles.addingNewMarkerTitle]}>
                Встановіть точку на карті
              </Text>
            </Animated.View>
            <Button
              title={isAddingNewMarker ? 'Відмінити' : 'Додати новий маркер'}
              raised
              containerStyle={styles.addingNewMarkerButton}
              onPress={isAddingNewMarker ? askAlert : startAddingNewMarker}
            />
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
              onDismiss={askAlert}
              handlePressSave={handlePressSaveMarker}
              handleChangeName={onChangeMarkerName}
              handleChageDescription={onChangeMarkerDescription}
              handleChangeCoordinates={onChangeMarkerCoordinates}
              loading={isLoadingSaveMarker}
              disabled={isLoadingSaveMarker}
              name={markerStore.marker.name}
              description={markerStore.marker.description}
              coordinates={markerStore.marker.coordinatesString}
            />
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
