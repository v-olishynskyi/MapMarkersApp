import { UserModel } from '@models';
import { CommunityUser, UsersService } from '@services';
import { PaginationStore } from '@store/pagination.abstract.store';
import { RootStore } from '@store/root.store';
import { action, makeObservable, observable } from 'mobx';

export class CommunityStore extends PaginationStore<CommunityUser, UserModel> {
  rootStore: RootStore;

  search: string = '';

  constructor(rootStore: RootStore) {
    super(UsersService.getCommunityUsers, UserModel);
    this.rootStore = rootStore;

    makeObservable(this, { search: observable, setSearch: action.bound });
  }

  setSearch(value: string) {
    this.search = value;
  }
}
