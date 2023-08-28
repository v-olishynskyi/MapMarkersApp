import React from 'react';
import { useStores } from '@store';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '@common/helpers';

const useLocationPermission = (options?: { withRequest: boolean }) => {
  const {
    appStore: { setIsGrantedLocationPermission, isGrantedLocationPermission },
  } = useStores();

  React.useEffect(() => {
    checkLocationPermission()
      .then(async ({ granted }) => {
        setIsGrantedLocationPermission(granted);

        if (options?.withRequest) {
          const requestResult = await requestLocationPermission();

          setIsGrantedLocationPermission(requestResult.granted);
        }
      })
      .catch(() => {
        setIsGrantedLocationPermission(false);
      });
  }, [setIsGrantedLocationPermission, isGrantedLocationPermission, options]);
};

export default useLocationPermission;
