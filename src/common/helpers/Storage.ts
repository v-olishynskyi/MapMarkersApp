import { MMKV } from 'react-native-mmkv';

export const globalStorage = new MMKV({
  id: 'global-storage',
  encryptionKey: 'global-storage-key!',
});
