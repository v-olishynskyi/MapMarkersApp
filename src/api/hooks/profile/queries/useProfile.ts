import { CacheKey } from '@api/CacheKey';
import { User } from '@common/types/entities';
import UsersService from '@services/users';
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useProfile = (
  options: Omit<
    UndefinedInitialDataOptions<User, AxiosError<unknown, any>>,
    'queryKey'
  >,
) => {
  const queryKey = [CacheKey.UserProfile];

  return useQuery<User, AxiosError>({
    ...options,
    queryKey,
    queryFn: UsersService.loadProfile,
    refetchInterval: 1000 * 60,
  });
};
