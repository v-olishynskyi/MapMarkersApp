import React from 'react';
import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';
import { RootStore } from '@store/root.store';
import { UiStore } from '@store/ui.store';
import { CommunityStore } from '@store/community.store';
import { ProfileViewStore } from '@store/profile-view.store';
import { UserSessionSheetStore } from '@store/user-session-sheet.store';
import { MapStore } from '@store/map.store';
import { AppStore } from '@store/app.store';

export const rootStore = new RootStore([
  { authStore: AuthStore },
  { userStore: UserStore },
  { uiStore: UiStore },
  { communityStore: CommunityStore },
  { profileViewStore: ProfileViewStore },
  { userSessionSheetStore: UserSessionSheetStore },
  { mapStore: MapStore },
  { appStore: AppStore },
]);

export const StoreContext = React.createContext(rootStore);

export const useStores = () => React.useContext(StoreContext);
