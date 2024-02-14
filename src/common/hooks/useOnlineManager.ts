import { useNetInfo } from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { useStores } from '@store';

const useOnlineManager = () => {
  const {
    appStore: { setIsOnline },
  } = useStores();

  const { isConnected } = useNetInfo({});

  setIsOnline(!!isConnected);
  onlineManager.setOnline(!!isConnected);
};

export default useOnlineManager;
