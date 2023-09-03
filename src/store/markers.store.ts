import { showToast, wait } from '@common/helpers';
import { LatLng } from '@common/types';
import { Marker } from '@common/types/entities';
import { ListItems, MarkerModel } from '@models';
import { CreateMarkerData } from '@services';
import { RootStore } from '@store/root.store';
import { makeAutoObservable, runInAction } from 'mobx';

export default class MarkersStore {
  rootStore: RootStore;

  markers: ListItems<Marker>;
  editableMarker: MarkerModel | null = null;

  isProcessing: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.markers = new ListItems<Marker>(MarkerModel, []);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  createTemporaryMarker(coordinates: LatLng) {
    const temporaryMarker = new MarkerModel({
      id: `temporary-${Math.random().toString()}`,
      ...coordinates,
      name: '',
      created_at: new Date(),
      updated_at: new Date(),
      description: '',
      user: this.rootStore.userStore.user,
      user_id: this.rootStore.userStore.user.id,
    });

    this.markers.push(temporaryMarker);
    this.setEditableMarker(temporaryMarker);
  }

  setEditableMarker(marker: MarkerModel) {
    this.editableMarker = marker;
  }

  async createMarker(markerData: MarkerModel) {
    try {
      this.isProcessing = true;

      console.log('qweqweq', this.rootStore);

      const data: CreateMarkerData = {
        description: markerData.description || '',
        name: markerData.name,
        latitude: markerData.latitude,
        longitude: markerData.longitude,
        user_id: this.rootStore.userStore.user.id,
      };
      console.log(
        'file: markers.store.ts:55 - MarkersStore - createMarker - data:',
        data,
      );

      const marker = await MarkerModel.create(data);
      const markerModel = new MarkerModel(marker);
      console.log(
        'file: markers.store.ts:58 - MarkersStore - createMarker - markerModel:',
        markerModel,
      );

      runInAction(() => {
        const temporaryMarkerIndex = this.markers.items.findIndex(item =>
          item.id.includes('temporary'),
        );
        this.markers.remove(temporaryMarkerIndex);
        this.editableMarker = null;
        this.markers.push(markerModel);
        this.isProcessing = false;
      });
    } catch (error: any) {
      showToast('error', error.message);
      runInAction(() => {
        this.isProcessing = false;
      });
    }
  }

  clearEditableMarker() {
    this.editableMarker = null;
    const temporaryMarkerIndex = this.markers.items.findIndex(marker =>
      marker.id.includes('temporary'),
    );

    if (temporaryMarkerIndex !== -1) {
      this.markers.remove(temporaryMarkerIndex);
    }
  }
}
