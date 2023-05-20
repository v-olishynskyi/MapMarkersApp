import React from 'react';
import { AuthNavigation } from './AuthNavigation';
import { AppNavigation } from './AppNavigation';

const RootNavigation = () => {
  return true ? <AuthNavigation /> : <AppNavigation />;
};

export default RootNavigation;
