import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable, observable } from 'mobx';
import { UserModel } from '../models/UserModel';
export class MainStore {
  user: UserModel | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,

      getUserInstance: action,
    });
  }

  setUser = (user: UserModel) => {
    this.user = user;
  };

  getUserInstance = async () => {
    try {
      // @ts-ignore
      const isAuth: boolean = JSON.parse(await AsyncStorage.getItem('isAuth'));

      if (isAuth) {
        const currentAuthenticatedUser: UserModel = JSON.parse(
          // @ts-ignore
          await AsyncStorage.getItem('currentAuthenticatedUser'),
        );

        const user = new UserModel(currentAuthenticatedUser);

        this.setUser(user);
      }

      return isAuth;
    } catch (error) {
      console.log('error getUserInstance', { error });
    }
  };
}
