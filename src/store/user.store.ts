import { ProfileService, UpdateProfileData, User } from '@services';
import { RootStore } from '@store/root.store';
import { showToast, wait } from '@utils/helpers';
import { makeAutoObservable, runInAction } from 'mobx';

export class UserStore {
  rootStore: RootStore;

  isLoading: boolean = false;
  isSaving: boolean = false;

  id: User['id'] = '';
  email: User['email'] = '';
  first_name: User['first_name'] = '';
  last_name: User['last_name'] = '';
  middle_name: User['middle_name'];
  username: User['username'];
  avatar_url: User['avatar_url'];
  createdAt: User['createdAt'];
  updatedAt: User['createdAt'];

  updateFormData: UpdateProfileData = {} as UpdateProfileData;
  updateFormErrors: Partial<UpdateProfileData>;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleData(user: User) {
    const keys = Object.keys(user);
    keys.forEach(key => (this[key] = user[key]));

    const updateDataKeys = keys.filter(key => key !== 'id' && key !== 'email');
    updateDataKeys.forEach(key => (this.updateFormData[key] = user[key]));
  }

  async loadProfile() {
    try {
      this.isLoading = true;

      const userData = await ProfileService.loadProfile();

      runInAction(() => {
        this.handleData(userData);
        this.isLoading = false;
      });
    } catch (error: any) {
      showToast('error', error.message);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async updateProfile() {
    try {
      this.isSaving = true;

      const newData = await ProfileService.updateProfile(
        this.id,
        this.updateFormData,
      );

      runInAction(() => {
        this.handleData(newData);
        this.isSaving = false;
      });
    } catch (error: any) {
      showToast('error', error.message);
      runInAction(() => {
        this.isSaving = false;
      });
      throw error;
    }
  }

  onChangeUpdateData(field: keyof UpdateProfileData, value: any) {
    this.updateFormData[field] = value;
  }

  resetUpdateFormData() {
    Object.keys(this.updateFormData).forEach(
      key => (this.updateFormData[key] = this[key]),
    );
  }

  async validateUpdateForm() {
    return await new Promise(resolve => {
      let errors = {};
      Object.keys(this.updateFormData).forEach(key => {
        const value = this.updateFormData[key];
      });
    });
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
