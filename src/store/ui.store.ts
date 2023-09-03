import { Orientations } from '@common/types';
import { RootStore } from '@store/root.store';
import { makeAutoObservable } from 'mobx';

export class UiStore {
  rootStore: RootStore;
  dark: boolean = false;
  orientation: Orientations = Orientations.PORTRAIT;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setDark(value: boolean) {
    this.dark = value;
  }
  setOrientation(orientation: Orientations) {
    this.orientation = orientation;
  }

  get isPortrait() {
    return this.orientation === Orientations.PORTRAIT;
  }
  get isLandscape() {
    return this.orientation === Orientations.LANDSCAPE;
  }
}
