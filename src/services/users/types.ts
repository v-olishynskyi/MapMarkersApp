import { User } from '@common/types/entities';

export type CommunityUser = Omit<User, 'sessions'>;

export type UpdateProfileData = {
  first_name: string;
  last_name: string;
  middle_name: string | null;
  username: string | null;
};
