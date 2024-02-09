import { PublicFileModel, UserModel, UserSessionModel } from '@models';
import { RootStore } from '@store/root.store';
import { makeAutoObservable } from 'mobx';
import { PublicFile, User } from '@common/types/entities';
import { Coordinates } from '@common/types';

export class UserStore {
  rootStore: RootStore;

  userEntity: User = {} as User;
  user: UserModel = {} as UserModel;
  userCoordinates: Coordinates | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUser(user: User) {
    this.userEntity = user;

    return (this.user = new UserModel(user));
  }

  setUserCoordinates(coordinates: Coordinates) {
    this.userCoordinates = coordinates;
  }

  setSessions(newList: UserSessionModel[]) {
    this.user.sessions.set(newList);
  }

  setAvatar(file: PublicFile | null) {
    if (!file) {
      return (this.user.avatar = null);
    }
    this.user.avatar = new PublicFileModel(file);
  }
}
