/**
 * @namespace Map
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { Alert, View } from 'react-native';
import { IconButton, Map } from './components';
import { useStores } from '@store';
import {
  IS_ANDROID,
  getTheme,
  requestLocationPermission,
} from '@common/helpers';
import { observer } from 'mobx-react-lite';
import MapView from 'react-native-maps';
import { RESULTS, openSettings } from 'react-native-permissions';

/**
 * MapTab
 *
 *
 * @memberof
 * @param {MapTabProps} params
 *
 * @example
 * // How to use Map:
 *  <MapTab />
 */
const MapTab: React.FC = () => {
  const styles = useStyles();
  const {
    appStore: { coordinates, isGrantedLocationPermission },
    mapStore: {},
  } = useStores();
  const {} = getTheme();

  const mapViewRef = React.useRef<MapView>(null);

  const goToCurrentLocation = React.useCallback(async () => {
    let hasLocationPermission = isGrantedLocationPermission;

    if (!isGrantedLocationPermission) {
      const { granted, result } = await requestLocationPermission();
      hasLocationPermission = granted;

      if (result === RESULTS.BLOCKED) {
        return Alert.alert('', 'Надайте доступ до місцеположення', [
          { style: 'cancel', text: 'Відміна' },
          { style: 'default', text: 'Налаштування', onPress: openSettings },
        ]);
      }
    }

    if (hasLocationPermission) {
      coordinates
        ? mapViewRef.current?.animateToRegion(
            {
              ...coordinates,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            },
            500,
          )
        : null;
    }
  }, [coordinates, isGrantedLocationPermission]);

  const onPressPlus = React.useCallback(async () => {
    let lastCamera = await mapViewRef.current?.getCamera();
    if (!lastCamera) {
      return;
    }

    if (IS_ANDROID) {
      lastCamera.zoom! += 1;
    }

    lastCamera.altitude! /= 2;

    mapViewRef.current?.animateCamera(lastCamera);
  }, []);

  const onPressMinus = React.useCallback(async () => {
    let lastCamera = await mapViewRef.current?.getCamera();
    if (!lastCamera) {
      return;
    }

    if (IS_ANDROID) {
      lastCamera.zoom! -= 1;
    }

    lastCamera.altitude! *= 2;

    mapViewRef.current?.animateCamera(lastCamera);
  }, []);

  const handleRegionChangeComplete = async () => {
    const camera = await mapViewRef.current?.getCamera();
    console.log(
      'file: MapTab.tsx:102 - handleRegionChangeComplete - camera:',
      camera,
    );

    if (!camera) {
      return;
    }

    // setCamera(camera);
  };

  return (
    <View style={styles.container}>
      <Map
        ref={mapViewRef}
        onRegionChangeComplete={handleRegionChangeComplete}
      />
      <IconButton
        style={styles.myLocationButton}
        iconName={'locate-outline'}
        onPress={goToCurrentLocation}
      />
      <IconButton
        style={styles.plusButton}
        iconName={'add-sharp'}
        onPress={onPressPlus}
      />
      <IconButton
        style={styles.minusButton}
        iconName={'remove-sharp'}
        onPress={onPressMinus}
      />
    </View>
  );
};

export default observer(MapTab);
