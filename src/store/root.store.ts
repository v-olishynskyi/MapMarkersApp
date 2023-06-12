import { AuthStore } from '@store/auth.store';
import { CommunityStore } from '@store/community.store';
import { UiStore } from '@store/ui.store';
import { UserStore } from '@store/user.store';

export class RootStore {
  authStore: AuthStore;
  userStore: UserStore;
  uiStore: UiStore;
  communityStore: CommunityStore;

  constructor(stores: Array<any>) {
    stores.forEach(store => {
      const storeKey = Object.keys(store)[0];
      this[storeKey] = new store[storeKey](this);
    });
  }
}
