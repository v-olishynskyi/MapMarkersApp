import { UserModel } from '@models';
import { RootStore } from '@store/root.store';
import { IS_IOS, showToast } from '@common/helpers';
import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '@common/types/entities';
import { Coordinates } from '@common/types';
import { Image } from 'react-native-image-crop-picker';

export class UserStore {
  rootStore: RootStore;

  user: UserModel = {} as UserModel;
  userCoordinates: Coordinates | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUser(user: User) {
    this.user = new UserModel(user);
  }

  async changeAvatar(file: Image) {
    try {
      const name = file.filename || `${this.user.id}-avatar`;
      const type = file.mime;
      const uri = IS_IOS ? file.path?.replace('file://', '') : file.path;

      let formData = new FormData();

      formData.append('file', {
        name,
        type,
        uri,
      } as unknown as Blob);

      const response = await this.user.update(formData);

      const newUser = new UserModel(response);
      runInAction(() => {
        this.user = newUser;
      });
    } catch (error: any) {
      showToast('error', error.message);
      runInAction(() => {});
      throw error;
    }
  }

  async removeAvatar() {
    try {
      await this.user.update({ avatar: null });
    } catch (error: any) {
      showToast('error', error.message);
      runInAction(() => {});
      throw error;
    }
  }

  setUserCoordinates(coordinates: Coordinates) {
    this.userCoordinates = coordinates;
  }

  // async terminateSession(sessionId: string) {
  //   this.isTerminatingSession = true;

  //   const sessions = this.user.sessions;

  //   try {
  //     await AuthService.logout(sessionId);
  //     runInAction(() => {
  //       const sessionIndex = sessions.items.findIndex(
  //         ({ id }) => sessionId === id,
  //       );
  //       this.user.sessions.remove(sessionIndex);
  //       this.isTerminatingSession = false;
  //     });
  //   } catch (error: any) {
  //     showToast('error', error.message);

  //     this.user.sessions = sessions;
  //     this.isTerminatingSession = false;
  //   }
  // }
}
