import { CacheKey } from '@api/CacheKey';
import { PaginationResponse } from '@common/types';
import { Group } from '@common/types/entities';
import GroupsService, { GetGroupsParams } from '@services/groups';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGroups = (params: GetGroupsParams = {}) => {
  const queryKey = [CacheKey.Groups, params];

  return useInfiniteQuery<PaginationResponse<Group>, AxiosError>({
    queryKey,
    queryFn: ({ pageParam }) =>
      GroupsService.paginatedGroups({ ...params, page: pageParam as any }),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage?.meta?.last_page || undefined,
  });
};
