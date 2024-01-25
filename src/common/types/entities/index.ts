import { Device } from '@common/types';
import { UserModel } from '@models';

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  username: string | null;
  avatar: PublicFile | null;
  sessions?: UserSession[];
  groups: Group[];
  own_groups?: Group[];

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

  created_at: string;
  updated_at: string;
};

export type Marker = {
  id: string;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  images: PublicFile[];
  author_id: string;
  author: User | UserModel; // TODO: CHANGE TO User
  is_draft: boolean;
  is_hidden: boolean;

  created_at: string;
  updated_at: string;
};

export type PublicFile = {
  id: string;
  key: string | null;
  url: string;
  mime?: string;

  created_at: string;
  updated_at: string;
};

export type Group = {
  id: string;
  name: string;
  owner_id: string;
  owner: User;
  members: User[];

  created_at: string;
  updated_at: string;
};

export type Entities = User | Marker | UserSession | PublicFile | Group;
