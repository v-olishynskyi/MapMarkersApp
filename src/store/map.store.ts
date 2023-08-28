import { RootStore } from '@store/root.store';
import { makeAutoObservable } from 'mobx';
import { Camera } from 'react-native-maps';

export class MapStore {
  rootStore: RootStore;

  camera: Camera | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }
}
