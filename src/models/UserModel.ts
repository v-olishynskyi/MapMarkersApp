import { User, UserSession } from '@common/types/entities';
import { ListItems, UserSessionModel } from '@models';
import { UpdateUserData, UsersService } from '@services';

export default class UserModel {
  id: User['id'];
  email: User['email'];
  first_name: User['first_name'];
  last_name: User['last_name'];
  middle_name: User['middle_name'];
  username: User['username'];
  avatar: User['avatar'];
  sessions: ListItems<UserSession>;

  created_at: User['created_at'];
  updated_at: User['updated_at'];

  constructor(user: User) {
    return this.handleData(user);
  }

  private handleData(user: User) {
    // @ts-ignore
    Object.keys(user).forEach(key => (this[key] = user[key]));
    if (user.sessions) {
      this.sessions = new ListItems<UserSession>(
        UserSessionModel,
        user.sessions,
      );
    }

    return this;
  }

  async get() {
    const user = await UserModel.get(this.id);

    this.handleData(user);

    return this;
  }

  public static async get(id: string): Promise<User> {
    const response = await UsersService.get(id);
    return response;
  }

  async update(data: UpdateUserData) {
    const newUserData = await UsersService.update(this.id, data);

    this.handleData(newUserData);
    return newUserData;
  }

  public static async update(id: string, data: UpdateUserData) {
    return await UsersService.update(id, data);
  }

  get fullname() {
    return `${this.first_name} ${this.last_name}`;
  }

  get initials() {
    return `${this.first_name.charAt(0).toUpperCase()}${this.last_name
      .charAt(0)
      .toUpperCase()}`;
  }

  get avatar_url() {
    return this.avatar?.url ?? '';
  }
}
