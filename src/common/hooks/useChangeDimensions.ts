import { useStores } from '@store';
import React from 'react';
import { Dimensions } from 'react-native';
import { isPortrait } from '@common/helpers';
import { Orientations } from '@common/types';

const useChangeDimensions = () => {
  const {
    uiStore: { setOrientation },
  } = useStores();

  React.useEffect(() => {
    Dimensions.addEventListener('change', () => {
      isPortrait()
        ? setOrientation(Orientations.PORTRAIT)
        : setOrientation(Orientations.LANDSCAPE);
    });
  }, [setOrientation]);
};

export default useChangeDimensions;
