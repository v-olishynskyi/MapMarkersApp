/**
 * @namespace Map
 * @category Map tab component
 * @subcategory Component
 *  */
import React from 'react';
import useStyles from './styles';
import { MapProps } from './types';
import { getTheme } from '@common/helpers';
import MapView, { Camera, LongPressEvent, Marker } from 'react-native-maps';
import { useLocationPermission } from '@common/hooks';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { AddEditMarkerModal } from '../';

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
    mapStore: { camera, markers, createTemporaryMarker },
    appStore: { coordinates },
  } = useStores();

  useLocationPermission({ withRequest: true });

  const initialCamera = React.useMemo<Camera>(
    () => ({
      center: { ...(coordinates ? coordinates : KYIV_COORDINATES) },
      heading: DEFAULT_HEADING,
      pitch: DEFAULT_PITCH,
      zoom: DEFAULT_ZOOM,
      altitude: DEFAULT_ALATITUDE,
    }),
    [coordinates],
  );

  const handleCreateTemporaryMarker = (event: LongPressEvent) =>
    createTemporaryMarker({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });

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
        onLongPress={handleCreateTemporaryMarker}
        {...props}>
        {markers.items.map(marker => {
          const markerComponent = (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          );

          return markerComponent;
        })}
      </MapView>
      <AddEditMarkerModal />
    </>
  );
});

export default observer(Map);
