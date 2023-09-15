import { LatLng } from '@common/types';

export type FormState = {
  name: string;
  description: string;
  latitude: LatLng['latitude'];
  longitude: LatLng['longitude'];
};
