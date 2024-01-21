import { showToast } from '@common/helpers';
import { LatLng } from '@common/types';
import { Marker } from '@common/types/entities';
import { ListItems, MarkerModel } from '@models';
import { CreateMarkerData, MarkersService, UpdateMarkerData } from '@services';
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

  async loadMarkers() {
    try {
      const markersList = await MarkersService.getAll();

      runInAction(() => {
        this.markers = new ListItems<Marker>(MarkerModel, markersList || []);
      });
    } catch (error: any) {
      showToast('error', error.message);
    }
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

    this.markers.push(markerModel);
    this.setEditableMarker(markerModel);
  }

  async createDraftMarker(coordinates: LatLng) {
    try {
      const images = this.editableMarker?.images.items.map(({ id }) => id);

      const draftData: CreateMarkerData = {
        ...coordinates,
        name: this.editableMarker?.name || '',
        description: this.editableMarker?.description || '',
        is_draft: true,
        is_hidden: true,
        author_id: this.rootStore.userStore.user.id,
        images,
      };

      const marker = await MarkersService.create(draftData);

      const markerModel = new MarkerModel(marker);

      runInAction(() => {
        this.markers.push(markerModel);
      });
    } catch (error: any) {
      showToast('error', error.message);
    }
  }

  setEditableMarker(marker: MarkerModel) {
    this.editableMarker = marker;
  }

  async createMarker(markerData: MarkerModel) {
    try {
      this.isProcessing = true;

      const images = markerData.images.items.map(({ id }) => id);

      const data: CreateMarkerData = {
        description: markerData.description || '',
        name: markerData.name,
        latitude: markerData.latitude,
        longitude: markerData.longitude,
        author_id: this.rootStore.userStore.user.id,
        is_draft: true,
        is_hidden: true,
        images,
      };

      const marker = await MarkerModel.create(data);
      const markerModel = new MarkerModel(marker);

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

  async updateMarker(id: string, body: UpdateMarkerData) {
    try {
      const response = await MarkerModel.update(id, body);
      this.rootStore.mapStore.loadActiveMarker(false);
      const updatedMarkerModel = new MarkerModel(response);

      runInAction(() => {
        this.editableMarker = updatedMarkerModel;
        const index = this.markers.items.findIndex(el => el.id === response.id);

        this.markers.replace(index, updatedMarkerModel);
      });
    } catch (error) {}
  }

  async removeMarker(id: string) {
    try {
      await MarkersService.delete(id);
      runInAction(() => {
        const removedMarkerIndex = this.markers.items.findIndex(
          marker => marker.id === id,
        );

        this.markers.remove(removedMarkerIndex);
        this.rootStore.mapStore.clearActiveMarker();
      });
    } catch (error: any) {
      showToast('error', error.message);
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
