import React from 'react';
import useStyles from './styles';
import { ActivityIndicator, View } from 'react-native';
import { useStores } from '@store';
import {
  getGenericPassword,
  getInternetCredentials,
} from 'react-native-keychain';
import { observer } from 'mobx-react-lite';

const RootLoading: React.FC<React.PropsWithChildren<any>> = observer(
  ({ children }) => {
    const styles = useStyles();

    const {
      authStore: { setIsAuth, setSessionId },
      uiStore: { isInitApp, setIsInitApp },
    } = useStores();

    React.useEffect(() => {
      (async () => {
        try {
          setIsInitApp(true);
          const creds = await getGenericPassword();
          if (creds) {
            const token = JSON.parse(creds.password);
            const isAuth = !!token?.accessToken;
            setIsAuth(isAuth);
          }

          const sessionInternetCredentials = await getInternetCredentials(
            'session_id',
          );

          if (sessionInternetCredentials) {
            const { sessionId: storedSessionId } = JSON.parse(
              sessionInternetCredentials.password,
            );
            setSessionId(storedSessionId);
          }
        } catch (error) {
          setIsAuth(false);
        } finally {
          setIsInitApp(false);
        }
      })();

      // eslint-disable-next-line
    }, []);

    return isInitApp ? (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : (
      children
    );
  },
);

export default RootLoading;
