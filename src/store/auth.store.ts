import { AuthService } from '../services/auth.service';
import { RootStore } from '@store/root.store';
import { action, makeObservable, observable, runInAction } from 'mobx';
import * as Keychain from 'react-native-keychain';

export class AuthStore {
  rootStore: RootStore;

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

        // actions
        setEmail: action.bound,
        setPassword: action.bound,
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

      const { token } = await AuthService.login({ email, password });

      await Keychain.setGenericPassword(email, token);

      runInAction(() => {
        this.isLoading = false;
      });
    } catch (error) {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      this.isLoading = true;

      this.email = '';
      this.password = '';

      await Keychain.resetGenericPassword();

      const test = await Keychain.getGenericPassword();
      console.log('file: auth.store.ts:70 - AuthStore - logout - test:', test);

      runInAction(() => {
        this.isLoading = false;
      });
    } catch (error) {
      console.log('errir', error);

      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  get isAuth() {
    return Boolean(Keychain.getGenericPassword());
  }
}
