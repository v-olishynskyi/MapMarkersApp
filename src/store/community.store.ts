import { CommunityUser, UsersService } from '@services';
import { RootStore } from '@store/root.store';
import { showToast } from '@utils/helpers';
import { makeAutoObservable, observable, runInAction } from 'mobx';

export class CommunityStore {
  rootStore: RootStore;

  isLoading: boolean = false;
  users = observable.array<CommunityUser>([]);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadUsers() {
    try {
      this.isLoading = true;

      const data = await UsersService.getCommunityUsers();

      runInAction(() => {
        this.users.replace(data);
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
