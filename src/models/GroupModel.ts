import { GroupPrivacyCodes } from '@common/types';
import { Group, User } from '@common/types/entities';
import ListItems from '@models/ListItems';
import PublicFileModel from '@models/PublicFileModel';
import UserModel from '@models/UserModel';

const groupPrivacyCodeLabels: Record<GroupPrivacyCodes, string> = {
  [GroupPrivacyCodes.PRIVATE]: 'Приватна',
  [GroupPrivacyCodes.PUBLIC]: 'Публічна',
};

class GroupModel {
  id: Group['id'];
  name: Group['name'];
  description: Group['description'];
  owner_id: Group['owner_id'];
  owner: UserModel;
  avatar: PublicFileModel | null;
  members: ListItems<User>;
  is_member: boolean;
  is_owner: boolean;
  privacy_code: Group['privacy_code'];

  created_at: string;
  updated_at: string;

  constructor(group: Group) {
    return this.handleData(group);
  }

  handleData(group: Group) {
    const keys = Object.keys(group);

    // @ts-ignore
    keys.forEach(key => (this[key] = group[key]));

    if (group.owner) {
      this.owner = new UserModel(group.owner);
    }
    if (group.avatar) {
      this.avatar = new PublicFileModel(group.avatar);
    }
    if (group.members?.length) {
      this.members = new ListItems<User>(UserModel, group.members);
    }

    return this;
  }

  get privacyCodeLabel() {
    return groupPrivacyCodeLabels[this.privacy_code];
  }
}

export default GroupModel;
