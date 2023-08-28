import { IS_IOS } from '@common/helpers';
import {
  PERMISSIONS,
  check,
  RESULTS,
  checkMultiple,
  request,
} from 'react-native-permissions';

type PermissionResults = {
  granted: boolean;
  result: any | Array<any>;
};

export const checkLocationPermission = async (): Promise<PermissionResults> => {
  if (IS_IOS) {
    const result = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);

    return { granted: result === RESULTS.GRANTED, result };
  } else {
    const results = await checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ]);

    return {
      granted:
        results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED ||
        results[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED,
      result: results,
    };
  }
};

export const requestLocationPermission =
  async (): Promise<PermissionResults> => {
    const requestedPermission = IS_IOS
      ? PERMISSIONS.IOS.LOCATION_ALWAYS
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const requestResults = await request(requestedPermission);

    return {
      granted: requestResults === RESULTS.GRANTED,
      result: requestResults,
    };
  };
