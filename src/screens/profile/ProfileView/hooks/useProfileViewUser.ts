import React from 'react';
import { UserModel } from '@models';
import UsersService from '@services/users';
import { useStores } from '@store';

const useProfileViewUser = (
  userId: string,
): {
  user: UserModel;
  isLoading: boolean;
  loadUser: VoidFunction;
  isMe: boolean;
} => {
  const {
    userStore: { user: currentUser, loadProfile, isLoading },
  } = useStores();
  const [isLoadindUser, setIsLoadindUser] = React.useState(false);
  const [user, setUser] = React.useState<UserModel>({} as UserModel);

  const isMe = userId === currentUser.id;

  const loadUser = React.useCallback(async () => {
    try {
      setIsLoadindUser(true);
      const loadedUser = await UsersService.get(userId);

      const userModel = new UserModel(loadedUser);
      setUser(userModel);
    } catch (error) {
    } finally {
      setIsLoadindUser(false);
    }
  }, [userId]);

  React.useEffect(() => {
    if (isMe) {
      return setUser(currentUser);
    }

    loadUser();
  }, [userId, currentUser, loadUser, isMe]);

  return {
    user,
    isLoading: isMe ? isLoading : isLoadindUser,
    loadUser: isMe ? loadProfile : loadUser,
    isMe,
  };
};

export default useProfileViewUser;
