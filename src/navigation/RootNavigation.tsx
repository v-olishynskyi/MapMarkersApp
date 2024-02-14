import React from 'react';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { useProfile } from '@api/hooks/profile';

const RootNavigation = observer(() => {
  const {
    authStore: { isAuth },
    userStore: { setUser },
  } = useStores();

  const { data: profile } = useProfile({ enabled: isAuth });

  React.useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile, setUser]);

  return isAuth ? <AppNavigation /> : <AuthNavigation />;
});

export default RootNavigation;
