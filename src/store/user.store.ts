import { UserModel } from '@models';
import { UpdateProfileData, UsersService } from '@services';
import { RootStore } from '@store/root.store';
import { showToast } from '@common/helpers';
import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '@common/types/entities';

export class UserStore {
  rootStore: RootStore;

  isLoading: boolean = false;
  isSaving: boolean = false;

  user: UserModel = {} as UserModel;

  updateFormData: UpdateProfileData = {} as UpdateProfileData;
  updateFormErrors: Partial<UpdateProfileData>;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleData(user: User) {
    this.user = new UserModel(user);

    const updateDataKeys = Object.keys(user).filter(
      key => key !== 'id' && key !== 'email' && key !== 'sessions',
    );
    updateDataKeys.forEach(key => (this.updateFormData[key] = user[key]));
  }

  async loadProfile() {
    try {
      this.isLoading = true;

      const userData = await UsersService.loadProfile();

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

      const newData = await this.user.update(this.updateFormData);

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

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  async validateUpdateForm() {
    // return await new Promise(resolve => {
    //   let errors = {};
    //   Object.keys(this.updateFormData).forEach(key => {
    //     const value = this.updateFormData[key];
    //   });
    // });
  }
}
