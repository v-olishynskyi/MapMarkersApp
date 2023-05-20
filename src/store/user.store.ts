import { RootStore } from '@store/root.store';
import { makeAutoObservable } from 'mobx';

export class UserStore {
  rootStore: RootStore;

  id: string = '';
  email: string = 'asdsadsadas';
  first_name: string = '';
  last_name: string = '';
  middle_name?: string = undefined;
  avatar?: string = undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }
}
