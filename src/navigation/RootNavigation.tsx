import React from 'react';
import { AuthNavigation } from './AuthNavigation';
import { AppNavigation } from './AppNavigation';
import { getGenericPassword } from 'react-native-keychain';

const RootNavigation = () => {
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const creds = await getGenericPassword();
      if (creds) {
        setIsAuth(true);
      }
      console.log('file: RootNavigation.tsx:13 - creds:', creds);
    })();
  }, []);

  return isAuth ? <AppNavigation /> : <AuthNavigation />;
};

export default RootNavigation;
