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
  isInitApp: boolean = true;

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
    this.isInitApp = true;

    try {
      const creds = await getGenericPassword();
      if (creds) {
        const token = JSON.parse(creds.password);
        if (token) {
          await this.rootStore.userStore.loadProfile();
          this.rootStore.authStore.setIsAuth(true);
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
    } catch (error) {
      runInAction(() => {
        this.rootStore.authStore.setIsAuth(false);
      });
    } finally {
      runInAction(() => {
        this.isInitApp = false;
      });
    }
  }
}
