export type AuthStackParamsList = {
  onboarding: undefined;
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
};

export type TabsStackParamsList = {
  map: undefined;
  community: undefined;
  profile: undefined;
};

export type ProfileStackParamsList = {
  'profile-tab': undefined;
  'edit-profile': undefined;
};

export type AppStackParamsList = {
  tabs: undefined;
  'profile-view': { userId?: string };
};
