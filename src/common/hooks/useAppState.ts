import React from 'react';
import { AppState, AppStateStatus } from 'react-native';

const useAppState = (onChange: (status: AppStateStatus) => void) => {
  React.useEffect(() => {
    const unsub = AppState.addEventListener('change', onChange);

    return () => unsub.remove();
  }, [onChange]);
};

export default useAppState;
