import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapTab from './MapTab/MapTab';
import { MapStackParamsList } from '@navigation';

const Stack = createNativeStackNavigator<MapStackParamsList>();

const MapStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="map-screen" component={MapTab} />
    </Stack.Navigator>
  );
};

export default MapStack;
