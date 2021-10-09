import AuthStore from './AuthStore';
import { MainStore } from './MainStore';

type StoreInstancesTypes = {
  authStore: AuthStore;
  mainStore: MainStore;
};

const storeInstances: StoreInstancesTypes = {
  authStore: new AuthStore(),
  mainStore: new MainStore(),
};

export { storeInstances };
