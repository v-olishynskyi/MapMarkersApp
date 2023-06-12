import { ProfileService, User } from '@services';
import { RootStore } from '@store/root.store';
import { showToast } from '@utils/helpers';
import { makeAutoObservable, runInAction } from 'mobx';

export class UserStore {
  rootStore: RootStore;

  isLoading: boolean = false;
  user: User = {
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    middle_name: null,
    username: null,
    avatar_url: null,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleUserData(user: User) {
    Object.keys(user).forEach(key => (this.user[key] = user[key]));
  }

  async loadProfile() {
    try {
      this.isLoading = true;

      const userData = await ProfileService.loadProfile();

      runInAction(() => {
        this.handleUserData(userData);
        this.isLoading = false;
      });
    } catch (error: any) {
      showToast('error', error.message);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
