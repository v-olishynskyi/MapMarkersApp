import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-map-clustering';
import { PROVIDER_GOOGLE, MapViewProps } from 'react-native-maps';
import { CustomMarker } from '.';
import { MarkerModel } from '../../models/MarkerModel';

type GoogleMapsMainProps = {
  children?: React.ReactNode;
  markers: MarkerModel[];
};

const GoogleMapsMain = React.forwardRef(
  (props: MapViewProps & GoogleMapsMainProps, ref) => {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref}
          style={styles.map}
          initialRegion={props.initialRegion}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsMyLocationButton
          {...props}>
          {props.markers.map(marker => (
            <CustomMarker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
              description={marker.description}
            />
          ))}
          {props.children}
        </MapView>
      </View>
    );
  },
);

export default GoogleMapsMain;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width,
  },
});
