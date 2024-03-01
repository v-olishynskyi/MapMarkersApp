import { showToast } from '@common/helpers';
import { LatLng } from '@common/types';
import { Marker } from '@common/types/entities';
import { MarkerModel } from '@models';
import { RootStore } from '@store/root.store';
import { makeAutoObservable, runInAction } from 'mobx';

export class MarkersStore {
  rootStore: RootStore;

  editableMarker: MarkerModel | null = null;

  activeMarkerId: string = '';
  activeMarker: MarkerModel | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  async createNewMarker(coordinates: LatLng) {
    const id = `new-${Math.random().toString()}`;
    const now = new Date().toDateString();

    const temporaryMarkerData: Marker = {
      ...coordinates,
      id,
      name: '',
      description: '',
      is_draft: false,
      is_hidden: false,
      author_id: this.rootStore.userStore.user.id,
      author: this.rootStore.userStore.userEntity,
      images: [],
      created_at: now,
      updated_at: now,
    };

    const markerModel = new MarkerModel(temporaryMarkerData);

    this.setEditableMarker(markerModel);
  }

  async createDraftMarker(coordinates: LatLng) {
    try {
      // const images = this.editableMarker?.images.items.map(({ id }) => id);

      // const draftData: CreateMarkerData['data'] = {
      //   ...coordinates,
      //   name: this.editableMarker?.name || '',
      //   description: this.editableMarker?.description || '',
      //   is_draft: true,
      //   is_hidden: true,
      //   author_id: this.rootStore.userStore.user.id,
      // };

      // const marker = await MarkersService.create(draftData);

      // const markerModel = new MarkerModel(marker);

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

  setActiveMarkerId(id: string) {
    this.activeMarkerId = id;
  }

  setActiveMarker(marker: Marker | MarkerModel) {
    if (marker instanceof MarkerModel) {
      return (this.activeMarker = marker);
    }
    this.activeMarker = new MarkerModel(marker);
  }

  clearActiveMarker() {
    this.activeMarkerId = '';
    this.activeMarker = null;
  }
}
