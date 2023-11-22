import { showToast } from '@common/helpers';
import { MarkerModel } from '@models';
import { MarkersService } from '@services';
import { RootStore } from '@store/root.store';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { Camera } from 'react-native-maps';

type CachedMarker = {
  expiresIn: number;
  marker: MarkerModel;
};

export class MapStore {
  rootStore: RootStore;

  camera: Camera | null = null;

  activeMarkerId: string = '';
  activeMarker: MarkerModel | null = null;
  cachedMarkers: Record<string, CachedMarker> = {};
  isLoadingMarker: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(
      this,
      {
        activeMarkerId: observable,
        isLoadingMarker: observable,
        loadActiveMarker: action.bound,
      },
      { autoBind: true },
    );
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }

  setActiveMarkerId(id: string) {
    this.activeMarkerId = id;
  }

  async loadActiveMarker(fromCache: boolean = true) {
    const maybeCachedMarker = this.cachedMarkers[this.activeMarkerId];

    if (
      fromCache &&
      maybeCachedMarker &&
      Date.now() < maybeCachedMarker.expiresIn
    ) {
      this.activeMarker = maybeCachedMarker.marker;
      return;
    } else {
      try {
        this.isLoadingMarker = true;
        const marker = await MarkersService.getOne(this.activeMarkerId);
        const markerModel = new MarkerModel(marker);

        runInAction(() => {
          this.activeMarker = markerModel;
          this.isLoadingMarker = false;
          this.cachedMarkers[this.activeMarkerId] = {
            marker: markerModel,
            expiresIn: Date.now() + 1_000 * 60 * 5,
          };
        });
      } catch (error: any) {
        showToast('error', error.message);
        runInAction(() => {
          this.activeMarker = null;
          this.isLoadingMarker = false;
        });
      }
    }
  }

  clearActiveMarker() {
    this.activeMarkerId = '';
    this.activeMarker = null;
  }
}
