import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-map-clustering';
import { PROVIDER_GOOGLE, MapViewProps } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { CustomMarker } from '.';
import { MarkerModel } from '../../models/MarkerModel';

type GoogleMapsMainProps = {
  children?: React.ReactNode;
  markers: MarkerModel[];
  handlePressMarkerCallout: (marker: MarkerModel) => void;
  isDirection?: boolean;
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
              marker={marker}
              handlePressCallout={() => {
                props.handlePressMarkerCallout(marker);
              }}
            />
          ))}
          <>
            {props.isDirection && (
              <MapViewDirections
                origin={props.markers[0].coordinates}
                // waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): undefined}
                destination={props.markers[1].coordinates}
                apikey={'AIzaSyC1MNx-ZtousxdQAfVgNd8Fc2j_HEBAeH4'}
                strokeWidth={3}
                strokeColor="hotpink"
                optimizeWaypoints={true}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                }}
                onError={errorMessage => {
                  // console.log('GOT AN ERROR');
                }}
              />
            )}
            {props.children}
          </>
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
