import { AuthService, LoginData, RegistrationData } from '@services';
import { RootStore } from '@store/root.store';
import { showToast } from '@utils/helpers';
import { makeAutoObservable, runInAction } from 'mobx';
import * as Keychain from 'react-native-keychain';

export class AuthStore {
  rootStore: RootStore;

  isAuth: boolean = false;
  isLoading: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  async signIn({ email, password }: LoginData) {
    try {
      this.isLoading = true;

      const { access_token } = await AuthService.login({
        email: email.toLowerCase(),
        password,
      });

      await Keychain.setGenericPassword(
        'acs_tkn',
        JSON.stringify({ accessToken: access_token }),
      );

      runInAction(() => {
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

      await Keychain.resetGenericPassword();

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
