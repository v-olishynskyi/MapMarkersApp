import { User } from '@common/types/entities';

export type CommunityUser = Omit<User, 'sessions'>;

export type UpdateProfileData = Partial<
  Pick<User, 'first_name' | 'last_name' | 'middle_name' | 'username'> & {
    avatar?: null;
  }
>;

export type UpdateUserData = Partial<
  Pick<User, 'first_name' | 'last_name' | 'middle_name' | 'username'> & {
    avatar?: null;
  }
>;
