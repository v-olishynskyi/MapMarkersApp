import React from 'react';
import { LatLng } from 'react-native-maps';
import { GeocoderResponse } from '../types';
import Geocoder from 'react-native-geocoding';
import { parseAddress } from '../utils/parseAddress';

type ExcludeAddressTypes = Array<
  | 'street_number'
  | 'route'
  | 'sublocality'
  | 'locality'
  | 'administrative_area_level_1'
  | 'administrative_area_level_2'
  | 'country'
>;

export default function useAdress(
  coordinate?: LatLng,
  excludeTypes?: ExcludeAddressTypes = [],
) {
  const [adress, setAdreess] = React.useState<string>();

  React.useEffect(() => {
    if (coordinate) {
      Geocoder.from(coordinate.latitude, coordinate.longitude).then(
        (json: GeocoderResponse) => {
          setAdreess(parseAddress(json, excludeTypes));
        },
      );
    }
  }, []);

  return adress;
}
