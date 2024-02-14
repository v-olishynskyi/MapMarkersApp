import { CacheKey } from '@api/CacheKey';
import { Group } from '@common/types/entities';
import { GroupModel } from '@models';
import GroupsService, { GetAllGroupsParams } from '@services/groups';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useAllGroups = (params: GetAllGroupsParams) => {
  const queryKey = [CacheKey.AllGroups, params];

  return useQuery<Group[], AxiosError, GroupModel[]>({
    queryKey,
    queryFn: () => GroupsService.all(params),
    select: data => data.map(group => new GroupModel(group)),
  });
};
