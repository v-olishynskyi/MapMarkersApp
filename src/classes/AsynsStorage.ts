import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageKeys =
  | 'currentAuthenticatedUser'
  | 'remember_me'
  | 'authData'
  | 'users'
  | 'isAuth'
  | 'markers';

export const storageKey = <const>[
  'currentAuthenticatedUser',
  'remember_me',
  'authData',
  'users',
  'isAuth',
  'markers',
];

export class AsyncStorageHelper {
  static async getItem(key: StorageKeys) {
    const json = await AsyncStorage.getItem(key);
    if (!json) {
      return null;
    }
    const data = JSON.parse(json);

    return data;
  }

  static async setItem(key: StorageKeys, data: any) {
    const json = JSON.stringify(data);

    return await AsyncStorage.setItem(key, json);
  }

  static async multiGet(keys: Array<typeof storageKey>) {
    const q = keys;
  }
}
