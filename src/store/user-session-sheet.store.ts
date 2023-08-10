import { UserSessionModel } from '@models';
import { makeAutoObservable } from 'mobx';

export class UserSessionSheetStore {
  session: UserSessionModel | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSession(session: UserSessionModel | null) {
    this.session = session;
  }
}
