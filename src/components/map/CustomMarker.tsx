import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-elements';
import { Marker, MarkerProps, Callout } from 'react-native-maps';
import { hooks } from '../../hooks';
import { MarkerModel } from '../../models/MarkerModel';
import { CalloutUserCard } from '../cards/UserCards';

type CustomMarkerProps = {
  children?: React.ReactNode;
  marker: MarkerModel;
  handlePressCallout: () => void;
};

const CustomMarker = (props: MarkerProps & CustomMarkerProps) => {
  const { marker } = props;

  const markerAddress = hooks.useAdress(marker.coordinates);

  return (
    <Marker {...props}>
      <Callout
        onPress={e => {
          if (
            e.nativeEvent.action === 'marker-inside-overlay-press' ||
            e.nativeEvent.action === 'callout-inside-press'
          ) {
            return;
          }

          props.handlePressCallout();
        }}
        style={styles.customView}>
        <View style={[styles.container]}>
          {marker.category && (
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 15,
                  backgroundColor: 'gray',
                }}>
                <Text style={{ color: '#fff' }}>{marker.category.label}</Text>
              </View>
            </View>
          )}
          <CalloutUserCard user={props.marker.owner} marker={props.marker} />
          <Text style={{ marginTop: 4 }} numberOfLines={2}>
            {markerAddress}
          </Text>
          <View style={{ marginTop: 6 }}>
            <Text h4 numberOfLines={1}>
              {marker.name}
            </Text>
            <Text numberOfLines={3} style={{ marginBottom: 30 }}>
              {marker.description}
            </Text>
          </View>
        </View>
        <Text style={styles.pressText}>Натисніть, щоб переглянути деталі</Text>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    // alignSelf: 'center',
  },
  customView: {
    width: 250,
    height: 200,
    backgroundColor: 'white',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'yellow',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#4da2ab',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  pressText: {
    color: 'gray',
    textAlign: 'center',
    position: 'absolute',
    bottom: 5,
  },
});

export default CustomMarker;
