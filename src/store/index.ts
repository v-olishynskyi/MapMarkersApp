import React, { useContext } from 'react';
import { AuthStore } from '@store/auth.store';
import { UserStore } from '@store/user.store';
import { RootStore } from '@store/root.store';

const StoreContext = React.createContext(
  new RootStore([{ authStore: AuthStore }, { userStore: UserStore }]),
);

export const useStores = () => useContext(StoreContext);
