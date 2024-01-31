import { useStores } from '@store';
import React from 'react';
import { useColorScheme } from 'react-native';

const useSystemTheme = () => {
  const {
    uiStore: { setIsDark },
  } = useStores();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    const isDarkTheme = colorScheme === 'dark';
    setIsDark(isDarkTheme);
  }, [colorScheme, setIsDark]);
};

export default useSystemTheme;
