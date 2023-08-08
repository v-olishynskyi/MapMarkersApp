import { showToast } from '@common/helpers';
import { AuthService, LoginData, RegistrationData } from '@services';
import { RootStore } from '@store/root.store';
import { makeAutoObservable, runInAction } from 'mobx';
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

  async signIn({ email, password }: LoginData) {
    try {
      this.isLoading = true;

      const { access_token, refresh_token, session_id } =
        await AuthService.login({
          email: email.toLowerCase(),
          password,
        });

      await Keychain.setGenericPassword(
        'acs_tkn',
        JSON.stringify({ accessToken: access_token }),
      );

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
}
