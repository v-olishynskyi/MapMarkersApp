import { IS_IOS, showToast } from '@common/helpers';
import { Device, Platforms } from '@common/types';
import { AuthService, LoginData, RegistrationData } from '@services';
import { RootStore } from '@store/root.store';
import { makeAutoObservable, runInAction } from 'mobx';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';

export class AuthStore {
  rootStore: RootStore;

  isAuth: boolean = false;
  sessionId: string;
  isLoading: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  async signIn({ email, password }: Omit<LoginData, 'device'>) {
    try {
      this.isLoading = true;

      // const deviceInfo = await DeviceInfo.id
      const name = IS_IOS
        ? await DeviceInfo.getDeviceName()
        : DeviceInfo.getSystemName();

      const device: Device = {
        id: await getUniqueId(),
        name,
        platform: IS_IOS ? Platforms.IOS : Platforms.ANDROID, // TODO: change if need support web
      };

      const { access_token, refresh_token, session_id } =
        await AuthService.login({
          email: email.toLowerCase(),
          password,
          device,
        });

      await Keychain.setGenericPassword(
        'acs_tkn',
        JSON.stringify({ accessToken: access_token }),
      );
      await this.rootStore.userStore.loadProfile();

      this.rootStore.markersStore.loadMarkers();

      Keychain.setInternetCredentials(
        'refresh_tkn',
        'rfsh_tkn',
        JSON.stringify({ refreshToken: refresh_token }),
      );

      Keychain.setInternetCredentials(
        'session_id',
        'session_id',
        JSON.stringify({ sessionId: session_id }),
      );

      runInAction(() => {
        this.sessionId = session_id;
        this.isLoading = false;
        this.isAuth = true;
      });
    } catch (error: any) {
      showToast('error', error.message, '');

      runInAction(() => {
        this.isLoading = false;
        this.isAuth = false;
      });

      throw error;
    }
  }

  async signUp(data: RegistrationData) {
    try {
      this.isLoading = true;

      const response = await AuthService.registration(data);

      showToast('success', response.message);
      runInAction(() => {
        this.isLoading = false;
      });
    } catch (error: any) {
      showToast('error', error.message, '');
      runInAction(() => {
        this.isLoading = false;
      });
      throw error;
    }
  }

  async logout() {
    try {
      this.isLoading = true;

      let sessionId;

      const sessionInternetCredentials = await Keychain.getInternetCredentials(
        'session_id',
      );
      if (sessionInternetCredentials) {
        const { sessionId: storedSessionId } = JSON.parse(
          sessionInternetCredentials.password,
        );

        sessionId = storedSessionId;
      }

      await AuthService.logout(sessionId);
      Keychain.resetGenericPassword();
      Keychain.resetInternetCredentials('refresh_tkn');
      Keychain.resetInternetCredentials('session_id');

      runInAction(() => {
        this.isLoading = false;
        this.isAuth = false;
      });
    } catch (error: any) {
      showToast('error', error.message, '');
      runInAction(() => {
        this.isLoading = false;
      });

      throw error;
    }
  }

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }

  setSessionId(id: string) {
    this.sessionId = id;
  }

  get currentSession() {
    return this.rootStore.userStore.user.sessions.items.find(
      session => session.id === this.sessionId,
    );
  }
}
