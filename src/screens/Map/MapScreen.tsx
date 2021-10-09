import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { CustomMarker, GoogleMapsMain } from '../../components/map';
import { MapEvent, LatLng } from 'react-native-maps';
import * as MobX from 'mobx-react-lite';
import { hooks } from '../../hooks';

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
  const { authStore } = hooks.useStores();

  const [markers, setMarkers] = React.useState([]);
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

  const addNewMarker = React.useCallback(marker => {
    const prevMarkers = markers;
    prevMarkers.push(marker);
    console.log(markers);
  }, []);

  const createNewMarker = ({
    coordinates,
    id,
  }: {
    coordinates: LatLng;
    id: number;
  }) => {
    return <CustomMarker key={id} coordinate={coordinates} />;
  };

  const onPressMap = React.useCallback((e: MapEvent) => {
    const coordinates = e.nativeEvent.coordinate;

    const newMarker = createNewMarker({ coordinates, id: markers.length + 1 });

    addNewMarker(newMarker);
  }, []);

  React.useEffect(() => {
    _generateMarkers(20);
  }, []);
  return (
    <MobX.Observer
      render={() => (
        <View style={styles.container}>
          <GoogleMapsMain
            initialRegion={INITIAL_REGION}
            onPress={onPressMap}
            onMarkerPress={() => {
              console.log('qweqweqweqweq');
            }}
            onCalloutPress={() => {
              console.log('jgvhjbhj');
            }}>
            <>
              {markers}
              {/* <CustomMarker
            coordinate={{
              latitude: getRandomLatitude(),
              longitude: getRandomLongitude(),
            }}>
            <Callout style={{ width: 200, height: 250 }}>
              <View style={{ backgroundColor: 'yellow' }}>
                <Text>This is a plain view</Text>
              </View>
            </Callout>
          </CustomMarker>
          <CustomMarker
            coordinate={{
              latitude: getRandomLatitude(),
              longitude: getRandomLongitude(),
            }}>
            <Callout style={{ width: 200, height: 250 }}>
              <View style={{ backgroundColor: 'yellow' }}>
                <Text>This is a plain view</Text>
              </View>
            </Callout>
          </CustomMarker>
          <CustomMarker
            coordinate={{
              latitude: getRandomLatitude(),
              longitude: getRandomLongitude(),
            }}>
            <Callout style={{ width: 200, height: 250 }}>
              <View style={{ backgroundColor: 'yellow' }}>
                <Text>This is a plain view</Text>
              </View>
            </Callout>
          </CustomMarker>
          <CustomMarker
            coordinate={{
              latitude: getRandomLatitude(),
              longitude: getRandomLongitude(),
            }}></CustomMarker>
        */}
            </>
          </GoogleMapsMain>
          <Text h2>{String(authStore.computedIsAuth)}</Text>
          <Button
            title={'Click'}
            raised
            onPress={() => {
              // const marker = (
              //   <CustomMarker
              //     key={markers.length + 1}
              //     coordinate={{
              //       latitude: getRandomLatitude(),
              //       longitude: getRandomLongitude(),
              //     }}
              //   />
              // );

              // addNewMarker(marker);
              authStore.setIsAuth(!authStore.computedIsAuth);
            }}
          />
        </View>
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
});
