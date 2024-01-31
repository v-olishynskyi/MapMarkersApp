/**
 * @namespace Map
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { View } from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import MapView, { LongPressEvent, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { MarkerManagementModes } from '@navigation';
import { Navigation } from './types';
import { MarkerModel } from '@models';
import { autorun } from 'mobx';
import { Map } from '@modules';
import { useMarkers } from '@api/hooks/markers';

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
  const { navigate } = useNavigation<Navigation>();
  const styles = useStyles();
  const {
    mapStore: { setActiveMarkerId, activeMarkerId, loadActiveMarker },
    markersStore: { createTemporaryMarker },
  } = useStores();

  const { data: markers, isLoading, isFetching } = useMarkers();
  console.log('isFetching:', isFetching);
  console.log('isLoading:', isLoading);

  const mapViewRef = React.useRef<MapView>(null);

  const handleRegionChangeComplete = async () => {
    const camera = await mapViewRef.current?.getCamera();

    if (!camera) {
      return;
    }

    // setCamera(camera);
  };

  const onCreateTemporaryMarker = (event: LongPressEvent) => {
    createTemporaryMarker({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    navigate('marker-management', { mode: MarkerManagementModes.CREATE });
  };

  const renderMarker = React.useCallback(
    (marker: MarkerModel) => {
      const markerComponent = (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          onPress={() => {
            setActiveMarkerId(marker.id);
          }}
        />
      );

      return markerComponent;
    },
    [setActiveMarkerId],
  );

  const autorunDisposer = autorun(() => {
    if (!activeMarkerId) {
      return;
    }

    loadActiveMarker();
  });

  React.useEffect(() => () => autorunDisposer(), [autorunDisposer]);

  return (
    <View style={styles.container}>
      <Map
        ref={mapViewRef}
        onRegionChangeComplete={handleRegionChangeComplete}
        onLongPress={onCreateTemporaryMarker}
        isLoadingMarkers={isLoading || isFetching}>
        {markers.map(renderMarker)}
      </Map>
    </View>
  );
};

export default observer(MapTab);
