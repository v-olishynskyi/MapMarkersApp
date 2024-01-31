import { Device } from '@common/types';

export type LoginData = {
  email: string;
  password: string;
  device: Device;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  session_id: string;
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
