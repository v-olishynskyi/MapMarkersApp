import { Group, User } from '@common/types/entities';
import ListItems from '@models/ListItems';
import UserModel from '@models/UserModel';

class GroupModel {
  id: Group['id'];
  name: Group['name'];
  owner_id: Group['owner_id'];
  owner: UserModel;
  members: ListItems<User>;
  created_at: string;
  updated_at: string;

  constructor(group: Group) {
    return this.handleData(group);
  }

  handleData(group: Group) {
    const keys = Object.keys(group);

    // @ts-ignore
    keys.forEach(key => (this[key] = group[key]));

    this.owner = new UserModel(group.owner);
    this.members = new ListItems<User>(UserModel, group.members);

    return this;
  }
}

export default GroupModel;
