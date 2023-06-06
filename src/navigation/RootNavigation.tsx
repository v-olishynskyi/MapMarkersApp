import React from 'react';
import { AuthNavigation } from './AuthNavigation';
import { AppNavigation } from './AppNavigation';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';

const RootNavigation = observer(() => {
  const {
    authStore: { isAuth },
  } = useStores();
  console.log('file: RootNavigation.tsx:10 - RootNavigation - isAuth:', isAuth);

  return isAuth ? <AppNavigation /> : <AuthNavigation />;
});

export default RootNavigation;
