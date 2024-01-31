import React from 'react';
import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';
import { RootStore } from '@store/root.store';
import { UiStore } from '@store/ui.store';
import { CommunityStore } from '@store/community.store';
import { UserSessionSheetStore } from '@store/user-session-sheet.store';
import { MapStore } from '@store/map.store';
import { AppStore } from '@store/app.store';
import MarkersStore from '@store/markers.store';

export const rootStore = new RootStore([
  { authStore: AuthStore },
  { userStore: UserStore },
  { uiStore: UiStore },
  { communityStore: CommunityStore },
  { userSessionSheetStore: UserSessionSheetStore },
  { mapStore: MapStore },
  { appStore: AppStore },
  { markersStore: MarkersStore },
]);

export const StoreContext = React.createContext(rootStore);

export const useStores = () => React.useContext(StoreContext);
