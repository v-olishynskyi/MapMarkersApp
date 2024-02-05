import { UserModel } from '@models';
import { useStores } from '@store';
import { useProfile } from '@api/hooks/profile';
import { useUser } from '@api/hooks/users';
import React from 'react';

type Response = {
  user: UserModel;
  isLoading: boolean;
  refetch: VoidFunction;
  isMe: boolean;
};

const useProfileViewUser = (userId: string): Response => {
  const {
    userStore: {
      user: { id: currentUserId },
      setUser,
    },
  } = useStores();

  const isMe = userId === currentUserId;

  const {
    data: profile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useProfile({ enabled: isMe });
  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useUser(userId, { enabled: !isMe });

  React.useEffect(() => {
    if (isMe && profile) {
      setUser(profile);
    }
  }, [isMe, profile, setUser]);

  return {
    user: isMe ? new UserModel(profile!) : user!,
    isLoading: isMe ? isLoadingProfile : isLoadingUser,
    refetch: isMe ? refetchProfile : refetchUser,
    isMe,
  };
};

export default useProfileViewUser;
