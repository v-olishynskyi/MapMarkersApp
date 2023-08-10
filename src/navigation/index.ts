import { createNavigationContainerRef } from '@react-navigation/native';
import { AppStackParamsList } from 'navigation/types';

export const navigationRef = createNavigationContainerRef<AppStackParamsList>();

export { default as RootNavigation } from './RootNavigation';
export { default as AppNavigation } from './AppNavigation';
export { default as AuthNavigation } from './AuthNavigation';
export { default as TabNavigation } from './TabNavigation';

export * from './types';
