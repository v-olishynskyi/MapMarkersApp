import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { MarkerModel } from '../../models/MarkerModel';
import { parseAddress } from '../../utils/parseAddress';
import { MapBottomSheetUserCard } from '../cards/UserCards';
import Geocoder from 'react-native-geocoding';

type MarkerDetailBottomCardProps = {
  containerStyle?: StyleProp<ViewStyle>;
  marker: MarkerModel;
  onPressAddress?: (marker: MarkerModel) => void;
};

export const MarkerDetailBottomCard = ({
  marker,
  containerStyle,
  onPressAddress,
}: MarkerDetailBottomCardProps) => {
  const [address, setAddress] = React.useState('');

  React.useEffect(() => {
    Geocoder.from(marker.coordinates).then(res => {
      setAddress(parseAddress(res));
    });
  }, [marker]);

  return (
    <View style={containerStyle}>
      <MapBottomSheetUserCard user={marker.owner} marker={marker} />
      <View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}
          onPress={() => onPressAddress && onPressAddress(marker)}>
          <Icon
            name="route"
            type="font-awesome-5"
            iconStyle={{ marginRight: 10 }}
            color={'rose'}
          />
          <Text>{address}</Text>
        </TouchableOpacity>
        <Text h2 style={[styles.centerText]}>
          {marker.name}
        </Text>
        <Text style={[styles.centerText]}>{marker.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: { textAlign: 'center' },
});
