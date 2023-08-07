import React, { useEffect } from 'react';

const useIsMounted = () => {
  const isMounted = React.useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
};

export default useIsMounted;
