import { AuthStore } from '@store/auth.store';
import { CommunityStore } from '@store/community.store';
import { ProfileViewStore } from '@store/profile-view.store';
import { UiStore } from '@store/ui.store';
import { UserSessionSheetStore } from '@store/user-session-sheet.store';
import { UserStore } from '@store/user.store';

export class RootStore {
  authStore: AuthStore;
  userStore: UserStore;
  uiStore: UiStore;
  communityStore: CommunityStore;
  profileViewStore: ProfileViewStore;
  userSessionSheetStore: UserSessionSheetStore;

  constructor(stores: Array<any>) {
    stores.forEach(store => {
      const storeKey = Object.keys(store)[0];
      this[storeKey] = new store[storeKey](this);
    });
  }
}
