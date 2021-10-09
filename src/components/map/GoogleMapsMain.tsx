import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-map-clustering';
import { PROVIDER_GOOGLE, MapViewProps } from 'react-native-maps';

const GoogleMapsMain = (
  props: MapViewProps & { children: React.ReactNode },
) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={props.initialRegion}
        provider={PROVIDER_GOOGLE}
        {...props}>
        {props.children}
      </MapView>
    </View>
  );
};

export default GoogleMapsMain;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
