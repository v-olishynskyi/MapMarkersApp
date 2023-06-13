import { ProfileService, User } from '@services';
import { RootStore } from '@store/root.store';
import { showToast } from '@utils/helpers';
import { makeAutoObservable, runInAction } from 'mobx';

export class UserStore {
  rootStore: RootStore;

  isLoading: boolean = false;
  id: User['id'] = '';
  email: User['email'] = '';
  first_name: User['first_name'] = '';
  last_name: User['last_name'] = '';
  middle_name: User['middle_name'];
  username: User['username'];
  avatar_url: User['avatar_url'];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleUserData(user: User) {
    Object.keys(user).forEach(key => (this[key] = user[key]));
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

  get fullname() {
    return `${this.first_name} ${this.last_name}`;
  }

  get initials() {
    return `${this.first_name.charAt(0).toUpperCase()}${this.last_name
      .charAt(0)
      .toUpperCase()}`;
  }
}
