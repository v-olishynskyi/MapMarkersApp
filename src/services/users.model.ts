export type IUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  username: string | null;
  avatar_url: string | null;

  createdAt: string;
  updatedAt: string;
};

export type CommunityUser = IUser;

export type UpdateProfileData = Omit<
  IUser,
  'id' | 'email' | 'createdAt' | 'updatedAt'
>;

export type UpdateUserData = Omit<
  IUser,
  'id' | 'email' | 'createdAt' | 'updatedAt'
>;
