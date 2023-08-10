import React from 'react';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';

const RootNavigation = observer(() => {
  const {
    authStore: { isAuth },
  } = useStores();

  return isAuth ? <AppNavigation /> : <AuthNavigation />;
});

export default RootNavigation;
