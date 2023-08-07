import { User } from '@common/types/entities';

export type CommunityUser = Omit<User, 'sessions'>;

export type UpdateProfileData = Omit<
  User,
  'id' | 'email' | 'createdAt' | 'updatedAt'
>;

export type UpdateUserData = Omit<
  User,
  'id' | 'email' | 'createdAt' | 'updatedAt'
>;
