import React from 'react';
import useStyles from './styles';
import { ActivityIndicator, View } from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';

const RootLoading: React.FC<React.PropsWithChildren<any>> = observer(
  ({ children }) => {
    const styles = useStyles();

    const {
      appStore: { isInitializingApp },
    } = useStores();

    return isInitializingApp ? (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : (
      children
    );
  },
);

export default RootLoading;
