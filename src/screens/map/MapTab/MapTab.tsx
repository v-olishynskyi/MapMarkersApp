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
import { Map } from '@modules';
import { useMarker, useMarkers } from '@api/hooks/markers';

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
    markersStore: {
      createNewMarker,
      setActiveMarkerId,
      activeMarkerId,
      setActiveMarker,
    },
  } = useStores();

  const { data: markers, isLoading, isFetching } = useMarkers();
  const { data: marker } = useMarker(activeMarkerId, {
    enabled: Boolean(activeMarkerId),
  });

  const mapViewRef = React.useRef<MapView>(null);

  const handleRegionChangeComplete = async () => {
    const camera = await mapViewRef.current?.getCamera();

    if (!camera) {
      return;
    }

    // setCamera(camera);
  };

  const onCreateTemporaryMarker = (event: LongPressEvent) => {
    const coordinates = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };

    createNewMarker(coordinates);
    navigate('marker-management', { mode: MarkerManagementModes.CREATE });
  };

  const renderMarker = React.useCallback(
    (markerItem: MarkerModel) => {
      const markerComponent = (
        <Marker
          key={markerItem.id}
          coordinate={{
            latitude: markerItem.latitude,
            longitude: markerItem.longitude,
          }}
          onPress={() => {
            setActiveMarkerId(markerItem.id);
          }}
        />
      );

      return markerComponent;
    },
    [setActiveMarkerId],
  );

  React.useEffect(() => {
    if (marker) {
      setActiveMarker(marker);
    }
  }, [marker, setActiveMarker]);

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
