import { IUser, UpdateUserData, UsersService } from '@services';

export default class UserModel {
  id: IUser['id'];
  email: IUser['email'];
  first_name: IUser['first_name'];
  last_name: IUser['last_name'];
  middle_name: IUser['middle_name'];
  username: IUser['username'];
  avatar_url: IUser['avatar_url'];

  createdAt: IUser['createdAt'];
  updatedAt: IUser['updatedAt'];

  constructor(user: IUser) {
    this.handleData(user);
  }

  private handleData(user: IUser) {
    Object.keys(user).forEach(key => (this[key] = user[key]));

    return this;
  }

  public async get() {
    const user = await UserModel.get(this.id);

    this.handleData(user);

    return this;
  }

  public static async get(id: string): Promise<IUser> {
    const response = await UsersService.get(id);
    return response;
  }

  public async update(data: UpdateUserData) {
    const newUserData = await UsersService.update(this.id, data);

    return this.handleData(newUserData);
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
}
