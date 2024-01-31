import { showToast } from '@common/helpers';
import { LatLng } from '@common/types';
import { RootStore } from '@store/root.store';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  getGenericPassword,
  getInternetCredentials,
} from 'react-native-keychain';

export class AppStore {
  rootStore: RootStore;

  isGrantedLocationPermission: boolean = false;
  deviceCoordinates: LatLng | null = null;
  isInitializingApp: boolean = true;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsGrantedLocationPermission(value: boolean) {
    this.isGrantedLocationPermission = value;
  }

  setDeviceCoordinates(coordinates: LatLng) {
    this.deviceCoordinates = coordinates;
  }

  async initApplication() {
    this.isInitializingApp = true;

    try {
      const creds = await getGenericPassword();
      if (creds) {
        const token = JSON.parse(creds.password);
        if (token) {
          this.rootStore.authStore.setIsAuth(true);
          await this.rootStore.markersStore.loadMarkers();
        }
      }

      const sessionInternetCredentials = await getInternetCredentials(
        'session_id',
      );

      if (sessionInternetCredentials) {
        const { sessionId: storedSessionId } = JSON.parse(
          sessionInternetCredentials.password,
        );
        this.rootStore.authStore.setSessionId(storedSessionId);
      }
    } catch (error: any) {
      const parsedError = error.message || error;
      const errorMessage = __DEV__ ? `app.store: ${parsedError}` : parsedError;

      showToast('error', errorMessage);
      runInAction(() => {
        this.rootStore.authStore.setIsAuth(false);
      });
    } finally {
      runInAction(() => {
        this.isInitializingApp = false;
      });
    }
  }
}
