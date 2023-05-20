import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';

export class RootStore {
  authStore: AuthStore;
  userStore: UserStore;

  constructor(stores: Array<any>) {
    stores.forEach(store => {
      const storeKey = Object.keys(store)[0];
      this[storeKey] = new store[storeKey](this);
    });
  }
}
