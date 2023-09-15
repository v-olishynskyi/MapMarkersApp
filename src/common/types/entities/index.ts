import { Device } from '@common/types';
import { UserModel } from '@models';

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  username: string | null;
  avatar_url: string | null;
  sessions?: UserSession[];

  created_at: string;
  updated_at: string;
};

export type UserSession = {
  id: string;
  user_id: string;
  device: Device;
  ip: string | null;
  app_version: string | null;
  location: string | null;
  created_at: Date;
  updated_at: Date;
};

export type Marker = {
  id: string;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  images: string[];
  user_id: string;
  user: User | UserModel; // TODO: CHANGE TO User
  created_at: Date;
  updated_at: Date;
};

export type Entities = User | Marker | UserSession;
