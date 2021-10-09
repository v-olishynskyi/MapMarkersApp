import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, computed, makeObservable, observable } from 'mobx';

type UserModel = {
  username: string;
  name: string;
  family_name: string;
  email: string;
};

export class MainStore {
  user: UserModel | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,

      updateUser: action,
    });
  }

  setUser = (user: UserModel) => {
    this.user = { ...user };
  };

  getUserInstance = async () => {
    try {
      const isAuth: boolean = JSON.parse(await AsyncStorage.getItem('isAuth'));

      if (isAuth) {
        const currentAuthenticatedUser: UserModel = JSON.parse(
          await AsyncStorage.getItem('currentAuthenticatedUser'),
        );

        this.setUser(currentAuthenticatedUser);
      }

      return isAuth;
    } catch (error) {
      console.log('error getUserInstance', { error });
    }
  };

  updateUser = async input => {};
}
