import { UserModel } from '@models';
import { RootStore } from '@store/root.store';
import { showToast } from '@utils/helpers';
import { makeAutoObservable, runInAction } from 'mobx';

export class ProfileViewStore {
  rootStore: RootStore;

  isLoading: boolean = false;
  userId: string = '';
  user: UserModel | null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadUser() {
    try {
      this.isLoading = true;
      const user = await UserModel.get(this.userId);

      runInAction(() => {
        this.user = new UserModel(user);
        this.isLoading = false;
      });
    } catch (error: any) {
      showToast('error', error.message);
      runInAction(() => {
        this.isLoading = false;
      });
      throw error;
    }
  }

  setUserId(id: string) {
    this.userId = id;
  }

  get isMe() {
    return this.userId === this.rootStore.userStore.user.id;
  }
}
