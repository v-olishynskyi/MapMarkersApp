import { Orientations } from '@common/types';
import { RootStore } from '@store/root.store';
import { action, computed, makeObservable, observable } from 'mobx';

export class UiStore {
  rootStore: RootStore;
  dark: boolean = false;
  orientation: Orientations = Orientations.PORTRAIT;

  isInitApp: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      dark: observable,
      orientation: observable,

      setDark: action,
      setOrientation: action,

      isPortrait: computed,
      isLandscape: computed,
    });
  }

  setDark(value: boolean) {
    this.dark = value;
  }
  setOrientation(orientation: Orientations) {
    this.orientation = orientation;
  }

  setIsInitApp(value: boolean) {
    this.isInitApp = value;
  }

  get isPortrait() {
    return this.orientation === Orientations.PORTRAIT;
  }
  get isLandscape() {
    return this.orientation === Orientations.LANDSCAPE;
  }
}
