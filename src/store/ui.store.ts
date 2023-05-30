import { RootStore } from '@store/root.store';
import { action, computed, makeObservable, observable } from 'mobx';

export class UiStore {
  rootStore: RootStore;
  dark: boolean = false;
  orientation: 'portrait' | 'landscape' = 'portrait';

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
  setOrientation(orientation: 'portrait' | 'landscape') {
    this.orientation = orientation;
  }

  get isPortrait() {
    return this.orientation === 'portrait';
  }
  get isLandscape() {
    return this.orientation === 'landscape';
  }
}
