import { CacheKey } from '@api/CacheKey';
import { User } from '@common/types/entities';
import { UserModel } from '@models';
import UsersService from '@services/users';
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUser = (
  userId: string,
  options: Omit<
    UndefinedInitialDataOptions<User, AxiosError<unknown, any>>,
    'queryKey' | 'queryFn' | 'select'
  >,
) => {
  const queryKey = [CacheKey.User, userId];

  return useQuery<User, AxiosError, UserModel>({
    queryKey,
    queryFn: () => UsersService.get(userId),
    select: user => new UserModel(user),
    ...options,
  });
};
