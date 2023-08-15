import { AppStackParamsList } from '@navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * @memberof ProfileView
 * @typedef {Object} ProfileViewProps
 */
export type ProfileViewProps = {};
export type RouteType = RouteProp<AppStackParamsList, 'profile-view'>;
export type NavigationType = NativeStackNavigationProp<AppStackParamsList>;
