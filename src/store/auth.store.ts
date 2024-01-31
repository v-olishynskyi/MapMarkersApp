import { RootStore } from '@store/root.store';
import { makeAutoObservable } from 'mobx';

export class AuthStore {
  rootStore: RootStore;

  isAuth: boolean = false;
  sessionId: string;
  isLoading: boolean = false;

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

  get currentSession() {
    return this.rootStore.userStore.user.sessions.items.find(
      session => session.id === this.sessionId,
    );
  }
}
