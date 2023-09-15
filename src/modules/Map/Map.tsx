/**
 * @namespace Map
 * @category Map tab component
 * @subcategory Component
 *  */
import React from 'react';
import useStyles from './styles';
import { MapProps } from './types';
import {
  IS_ANDROID,
  getTheme,
  requestLocationPermission,
} from '@common/helpers';
import { RESULTS, openSettings } from 'react-native-permissions';
import MapView, { Camera } from 'react-native-maps';
import { useLocationPermission } from '@common/hooks';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { IconButton } from '@components';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const KYIV_COORDINATES = {
  latitude: 50.430397616916096,
  longitude: 30.541007622159007,
};

const DEFAULT_ZOOM = 10;
const DEFAULT_HEADING = 0;
const DEFAULT_PITCH = 0;
const DEFAULT_ALATITUDE = 70_000;

/**
 * Map
 *
 * @memberof
 * @param {MapProps} params
 *
 * @example
 * // How to use Map:
 *  <Map />
 */
const Map = React.forwardRef<MapView, MapProps>((props, ref) => {
  const styles = useStyles();
  const { colors } = getTheme();
  const {
    mapStore: { camera },
    appStore: { deviceCoordinates, isGrantedLocationPermission },
  } = useStores();

  useLocationPermission({ withRequest: true });

  const initialCamera = React.useMemo<Camera>(
    () => ({
      center: { ...(deviceCoordinates ? deviceCoordinates : KYIV_COORDINATES) },
      heading: DEFAULT_HEADING,
      pitch: DEFAULT_PITCH,
      zoom: DEFAULT_ZOOM,
      altitude: DEFAULT_ALATITUDE,
    }),
    [deviceCoordinates],
  );

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
      if (typeof ref !== 'function' && ref?.current) {
        deviceCoordinates
          ? ref.current?.animateCamera(
              { center: { ...deviceCoordinates }, altitude: 1000, zoom: 10 },
              { duration: 500 },
            )
          : null;
      }
    }
  }, [deviceCoordinates, isGrantedLocationPermission, ref]);

  const onPressPlus = React.useCallback(async () => {
    if (typeof ref !== 'function' && ref?.current) {
      let lastCamera = await ref.current?.getCamera();
      if (!lastCamera) {
        return;
      }

      if (IS_ANDROID) {
        lastCamera.zoom! += 1;
      }

      lastCamera.altitude! /= 2;

      ref.current?.animateCamera(lastCamera);
    }
  }, [ref]);

  const onPressMinus = React.useCallback(async () => {
    if (typeof ref !== 'function' && ref?.current) {
      let lastCamera = await ref.current.getCamera();
      if (!lastCamera) {
        return;
      }

      if (IS_ANDROID) {
        lastCamera.zoom! -= 1;
      }

      lastCamera.altitude! *= 2;

      ref.current?.animateCamera(lastCamera);
    }
  }, [ref]);

  return (
    <>
      <MapView
        key={JSON.stringify(initialCamera)}
        ref={ref}
        style={styles.map}
        camera={camera ?? initialCamera}
        tintColor={colors.primary}
        showsUserLocation
        followsUserLocation
        {...props}
      />
      <IconButton
        style={[styles.iconButton, styles.myLocationButton]}
        icon={<Icon name={'locate-outline'} size={32} color={colors.text} />}
        onPress={goToCurrentLocation}
      />
      <IconButton
        style={[styles.iconButton, styles.plusButton]}
        icon={<Icon name={'add-sharp'} size={32} color={colors.text} />}
        onPress={onPressPlus}
      />
      <IconButton
        style={[styles.iconButton, styles.minusButton]}
        icon={<Icon name={'remove-sharp'} size={32} color={colors.text} />}
        onPress={onPressMinus}
      />
    </>
  );
});

export default observer(Map);
