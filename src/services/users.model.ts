export type User = {
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

export type CommunityUser = User;

export type UpdateProfileData = Omit<User, 'id' | 'email'>;
