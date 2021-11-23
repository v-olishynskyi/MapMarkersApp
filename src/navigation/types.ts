export type MainStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
  ConfirmAccount: undefined;

  ProfileSettings: undefined;
  Comments: undefined;
  Comment: { commentId: string };
  Markers: undefined;

  Main?: {
    screen?: string;
  };
};

export type TabParamsList = {
  КАРТА: undefined;
  ПРОФІЛЬ: undefined;
};

export type ProfileSettings = {
  Panel: undefined;
};
