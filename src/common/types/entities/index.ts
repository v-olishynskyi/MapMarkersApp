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
  device: string;
  created_at: Date;
  updated_at: Date;
};

export type Entities = User | UserSession;
