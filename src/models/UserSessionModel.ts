import { UserSession } from '@common/types/entities';

export default class UserSessionModel {
  id: UserSession['id'];
  user_id: UserSession['user_id'];
  device: UserSession['device'];
  ip: UserSession['ip'];
  app_version: UserSession['app_version'];
  location: UserSession['location'];
  created_at: string;
  updated_at: string;

  constructor(userSession: UserSession) {
    return this.handleData(userSession);
  }

  private handleData(userSession: UserSession) {
    // @ts-ignore
    Object.keys(userSession).forEach(key => (this[key] = userSession[key]));

    return this;
  }
}
