import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export { default as RootNavigation } from './RootNavigation';
export { default as AppNavigation } from './AppNavigation';
export { default as AuthNavigation } from './AuthNavigation';
export { default as TabNavigation } from './TabNavigation';
export { default as ProfileNavigator } from './ProfileNavigator';

export * from './types';
