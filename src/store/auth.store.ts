import { UsersService, AuthService } from '@services';
import { RootStore } from '@store/root.store';
import { action, makeObservable, observable, runInAction } from 'mobx';
import * as Keychain from 'react-native-keychain';

export class AuthStore {
  rootStore: RootStore;

  isAuth: boolean = false;

  isLoading: boolean = false;
  email: string = '';
  password: string = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(
      this,
      {
        // observables
        email: observable,
        password: observable,
        isLoading: observable,
        isAuth: observable,

        // actions
        setEmail: action.bound,
        setPassword: action.bound,
        setIsAuth: action.bound,
        signIn: action.bound,
        logout: action.bound,

        // computed
      },
      { autoBind: true },
    );
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  async signIn(email: string, password: string) {
    try {
      this.isLoading = true;

      const { access_token } = await AuthService.login({ email, password });

      await Keychain.setGenericPassword(
        'acs_tkn',
        JSON.stringify({ accessToken: access_token }),
      );

      await UsersService.getAllUsers();

      runInAction(() => {
        this.isLoading = false;
        this.isAuth = true;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async logout() {
    try {
      this.isLoading = true;

      this.email = '';
      this.password = '';

      await Keychain.resetGenericPassword();

      runInAction(() => {
        this.isLoading = false;
        this.isAuth = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }
}
