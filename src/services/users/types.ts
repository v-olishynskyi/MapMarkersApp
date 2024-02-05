import { User } from '@common/types/entities';

export type GetUsersParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export type CommunityUser = Omit<User, 'sessions'>;
