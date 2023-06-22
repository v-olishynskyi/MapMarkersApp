export type AuthStackParamsList = {
  onboarding: undefined;
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
};

export type TabsStackParamsList = {
  'map-tab': undefined;
  'community-tab': undefined;
  'profile-tab': undefined;
};

export type ProfileStackParamsList = {
  'profile-view': { userId?: string } | undefined;
  'edit-profile': undefined;
};

export type AppStackParamsList = {
  tabs: undefined;
  support: undefined;
  'about-us': undefined;
  settings: undefined;
  'profile-view': { userId?: string } | undefined;
  'edit-profile': undefined;
};
