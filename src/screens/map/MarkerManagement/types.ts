import { LatLng } from '@common/types';
import { AppStackParamsList, MapStackParamsList } from '@navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type FormState = {
  name: string;
  description: string;
  latitude: LatLng['latitude'];
  longitude: LatLng['longitude'];
  is_hidden: boolean;
};

export type RouteType = RouteProp<AppStackParamsList, 'marker-management'>;
export type NavigationType = NativeStackNavigationProp<
  AppStackParamsList & MapStackParamsList
>;
