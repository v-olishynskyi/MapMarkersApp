import { UserModel } from '@models';
import { CommunityUser, UsersService } from '@services';
import { PaginationStore } from '@store/pagination.store';
import { RootStore } from '@store/root.store';

export class CommunityStore extends PaginationStore<CommunityUser, UserModel> {
  rootStore: RootStore;

  search: string = '';

  constructor(rootStore: RootStore) {
    super(UsersService.getCommunityUsers, UserModel);
    this.rootStore = rootStore;

    // makeObservable(this, { isLoading: observable });
  }

  setSearch(value: string) {
    this.search = value;
  }
}
