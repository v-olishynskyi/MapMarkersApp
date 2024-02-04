import { UserModel, UserSessionModel } from '@models';
import { RootStore } from '@store/root.store';
import { makeAutoObservable } from 'mobx';
import { User } from '@common/types/entities';
import { Coordinates } from '@common/types';

export class UserStore {
  rootStore: RootStore;

  user: UserModel = {} as UserModel;
  userCoordinates: Coordinates | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUser(user: User | UserModel) {
    if (user instanceof UserModel) {
      return (this.user = user);
    }

    return (this.user = new UserModel(user));
  }

  setUserCoordinates(coordinates: Coordinates) {
    this.userCoordinates = coordinates;
  }

  setSessions(newList: UserSessionModel[]) {
    this.user.sessions.set(newList);
  }
}
