import { UserSession } from '@common/types/entities';

export default class UserSessionModel {
  id: UserSession['id'];
  user_id: UserSession['user_id'];
  device: UserSession['device'];
  created_at: UserSession['created_at'];
  updated_at: UserSession['updated_at'];

  constructor(userSession: UserSession) {
    return this.handleData(userSession);
  }

  private handleData(userSession: UserSession) {
    Object.keys(userSession).forEach(key => (this[key] = userSession[key]));

    return this;
  }
}
