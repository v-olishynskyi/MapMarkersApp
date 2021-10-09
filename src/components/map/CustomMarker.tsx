import * as React from 'react';
import { View } from 'react-native';
import { Marker, MarkerProps, Callout } from 'react-native-maps';
import { Text } from 'react-native-elements';

type CustomMarkerProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
};

const CustomMarker = (props: MarkerProps & CustomMarkerProps) => {
  return (
    <Marker {...props}>
      <Callout
        style={{ width: 200, height: 250 }}
        onPress={() => {
          console.log('asdasada');
        }}>
        <View>
          <Text h1>{props.title}</Text>
          <Text>{props.description ? props.description : ''}</Text>
        </View>
      </Callout>
    </Marker>
  );
};

export default CustomMarker;
