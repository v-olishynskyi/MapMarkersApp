import { AppStackParamsList, MapStackParamsList } from '@navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type Navigation = NativeStackNavigationProp<
  AppStackParamsList & MapStackParamsList
>;
