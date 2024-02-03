import { RootStore } from '@store/root.store';
import { makeAutoObservable } from 'mobx';
import * as Keychain from 'react-native-keychain';

export class AuthStore {
  rootStore: RootStore;

  isAuth: boolean = false;
  sessionId: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }

  setSessionId(id: string) {
    this.sessionId = id;
  }

  async logout() {
    this.setIsAuth(false);
    this.setSessionId('');

    await Keychain.resetGenericPassword();
    await Keychain.resetInternetCredentials('refresh_tkn');
    await Keychain.resetInternetCredentials('session_id');
  }

  get currentSession() {
    return this.rootStore.userStore.user.sessions.items.find(
      session => session.id === this.sessionId,
    );
  }
}
