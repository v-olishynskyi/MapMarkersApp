import React from 'react';
import { useStores } from '@store';
import GetLocation from 'react-native-get-location';

const useUserCoordinates = () => {
  const {
    appStore: { isGrantedLocationPermission, setCoordinates },
  } = useStores();

  const requestCoordinates = React.useCallback(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 0,
    }).then(({ latitude, longitude }) => {
      setCoordinates({
        latitude,
        longitude,
      });
    });
  }, [setCoordinates]);

  React.useEffect(() => {
    if (isGrantedLocationPermission) {
      requestCoordinates();
    }
  }, [isGrantedLocationPermission, requestCoordinates]);

  return { requestCoordinates };
};

export default useUserCoordinates;
