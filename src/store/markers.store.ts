import { showToast } from '@common/helpers';
import { LatLng } from '@common/types';
import { Marker } from '@common/types/entities';
import { MarkerModel } from '@models';
import MarkersService, { CreateMarkerData } from '@services/markers';
import { RootStore } from '@store/root.store';
import { makeAutoObservable, runInAction } from 'mobx';

export class MarkersStore {
  rootStore: RootStore;

  editableMarker: MarkerModel | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  async createTemporaryMarker(coordinates: LatLng) {
    const temporaryMarkerData: Marker = {
      ...coordinates,
      id: `temporary-${Math.random().toString()}`,
      name: '',
      description: '',
      is_draft: false,
      is_hidden: false,
      author_id: this.rootStore.userStore.user.id,
      author: this.rootStore.userStore.user,
      images: [],
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    const markerModel = new MarkerModel(temporaryMarkerData);

    this.setEditableMarker(markerModel);
  }

  async createDraftMarker(coordinates: LatLng) {
    try {
      const images = this.editableMarker?.images.items.map(({ id }) => id);

      const draftData: CreateMarkerData['data'] = {
        ...coordinates,
        name: this.editableMarker?.name || '',
        description: this.editableMarker?.description || '',
        is_draft: true,
        is_hidden: true,
        author_id: this.rootStore.userStore.user.id,
      };

      const marker = await MarkersService.create(draftData);

      const markerModel = new MarkerModel(marker);

      runInAction(() => {});
    } catch (error: any) {
      showToast('error', error.message);
    }
  }

  setEditableMarker(marker: MarkerModel) {
    this.editableMarker = marker;
  }

  clearEditableMarker() {
    this.editableMarker = null;
  }
}
