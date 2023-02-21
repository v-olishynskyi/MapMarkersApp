import AuthStore from './AuthStore';
import DataStore from './DataStore';
import { MainStore } from './MainStore';
import MarkerStore from './MarkerStore';
import ErrorStore from './ErrorStore';

type StoreInstancesTypes = {
  authStore: AuthStore;
  mainStore: MainStore;
  markerStore: MarkerStore;
  dataStore: DataStore;
  errorStore: ErrorStore;
};

const storeInstances: StoreInstancesTypes = {
  authStore: new AuthStore(),
  mainStore: new MainStore(),
  markerStore: new MarkerStore(),
  dataStore: new DataStore(),
  errorStore: new ErrorStore(),
};

export { storeInstances };
