import { CacheKey } from '@api/CacheKey';
import { PaginationResponse } from '@common/types';
import { CommunityUser, GetUsersParams } from '@services/users';
import UsersService from '@services/users/users.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUsers = (params: GetUsersParams) => {
  const queryKey = [CacheKey.Users, params];

  return useInfiniteQuery<PaginationResponse<CommunityUser>, AxiosError>({
    queryKey,
    queryFn: ({ pageParam }) =>
      UsersService.getCommunityUsers({ ...params, page: pageParam as any }),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.meta?.next_page || undefined,
  });
};
