import React, { useContext } from 'react';
import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';
import { RootStore } from '@store/root.store';
import { UiStore } from '@store/ui.store';

const StoreContext = React.createContext(
  new RootStore([
    { authStore: AuthStore },
    { userStore: UserStore },
    { uiStore: UiStore },
  ]),
);

export const useStores = () => useContext(StoreContext);
