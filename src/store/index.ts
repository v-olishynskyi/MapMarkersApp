import React, { useContext } from 'react';
import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';
import { RootStore } from '@store/root.store';
import { UiStore } from '@store/ui.store';
import { CommunityStore } from '@store/community.store';
import { ProfileViewStore } from '@store/profile-view.store';

export const rootStore = new RootStore([
  { authStore: AuthStore },
  { userStore: UserStore },
  { uiStore: UiStore },
  { communityStore: CommunityStore },
  { profileViewStore: ProfileViewStore },
]);

export const StoreContext = React.createContext(rootStore);

export const useStores = () => useContext(StoreContext);
