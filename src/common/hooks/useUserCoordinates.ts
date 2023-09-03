import React from 'react';
import { useStores } from '@store';
import GetLocation from 'react-native-get-location';

const useUserCoordinates = () => {
  const {
    appStore: { isGrantedLocationPermission, setDeviceCoordinates },
  } = useStores();

  const requestCoordinates = React.useCallback(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 0,
    }).then(({ latitude, longitude }) => {
      setDeviceCoordinates({
        latitude,
        longitude,
      });
    });
  }, [setDeviceCoordinates]);

  React.useEffect(() => {
    if (isGrantedLocationPermission) {
      requestCoordinates();
    }
  }, [isGrantedLocationPermission, requestCoordinates]);

  return { requestCoordinates };
};

export default useUserCoordinates;
