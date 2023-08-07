export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type RegistrationData = {
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
  password: string;
};

export type RefreshTokenResponse = {
  access_token: string;
};
