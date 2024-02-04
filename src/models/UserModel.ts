import { Group, Marker, User, UserSession } from '@common/types/entities';
import { ListItems, UserSessionModel, GroupModel, MarkerModel } from '@models';
import UsersService from '@services/users';

export default class UserModel {
  id: User['id'];
  email: User['email'];
  first_name: User['first_name'];
  last_name: User['last_name'];
  middle_name: User['middle_name'];
  username: User['username'];
  avatar: User['avatar'];
  sessions: ListItems<UserSession>;
  groups: ListItems<Group>;
  own_groups: ListItems<Group>;
  markers: ListItems<Marker>;

  created_at: string;
  updated_at: string;

  constructor(user: User) {
    return this.handleData(user);
  }

  private handleData(user: User) {
    // @ts-ignore
    Object.keys(user).forEach(key => (this[key] = user[key]));

    if (user.sessions?.length) {
      this.sessions = new ListItems<UserSession>(
        UserSessionModel,
        user.sessions,
      );
    }

    if (user.groups?.length) {
      this.groups = new ListItems<Group>(GroupModel, user.groups);
    }

    if (user?.own_groups?.length) {
      //   this.own_groups = new ListItems<Group>(GroupModel, user.own_groups);
    }

    if (user.markers?.length) {
      this.markers = new ListItems<Marker>(MarkerModel, user.markers || []);
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
