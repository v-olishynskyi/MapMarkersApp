import { RootStore } from '@store/root.store';
import { action, computed, makeObservable, observable } from 'mobx';

export class AuthStore {
  rootStore: RootStore;

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

        // actions
        setEmail: action,
        setPassword: action,

        // computed
        test: computed,
      },
      { autoBind: true },
    );
  }

  setEmail(email: string) {
    this.email = email;
    this.rootStore.userStore.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  get test() {
    return this.rootStore.userStore.email;
  }
}
