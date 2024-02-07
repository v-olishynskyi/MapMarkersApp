import { CacheKey } from '@api/CacheKey';
import { Group } from '@common/types/entities';
import { GroupModel } from '@models';
import GroupsService from '@services/groups';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGroup = (id: string) => {
  const queryKey = [CacheKey.Group, id];

  return useQuery<Group, AxiosError, GroupModel>({
    queryKey,
    queryFn: () => GroupsService.get(id),
    select: group => new GroupModel(group),
  });
};
