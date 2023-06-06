import React, { PropsWithChildren } from 'react';
import useStyles from './styles';
import { ActivityIndicator, View } from 'react-native';
import { useStores } from '@store';
import { getGenericPassword } from 'react-native-keychain';
import { wait } from '@utils/helpers';
import { observer } from 'mobx-react-lite';

const RootLoading: React.FC<PropsWithChildren<any>> = observer(
  ({ children }) => {
    const styles = useStyles();
    const [isLoading, setIsLoading] = React.useState(false);

    const {
      authStore: { setIsAuth },
    } = useStores();

    React.useEffect(() => {
      (async () => {
        try {
          setIsLoading(true);
          await wait(1000);
          const creds = await getGenericPassword();
          if (creds) {
            const token = JSON.parse(creds.password);
            setIsAuth(!!token?.accessToken);
          }
        } catch (error) {
          setIsAuth(false);
        } finally {
          setIsLoading(false);
        }
      })();

      // eslint-disable-next-line
    }, []);

    return isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : (
      children
    );
  },
);

export default RootLoading;
