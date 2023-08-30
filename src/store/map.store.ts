import { LatLng } from '@common/types';
import { Marker } from '@common/types/entities';
import { ListItems, MarkerModel } from '@models';
import { RootStore } from '@store/root.store';
import { makeAutoObservable } from 'mobx';
import { Camera } from 'react-native-maps';

export class MapStore {
  rootStore: RootStore;

  camera: Camera | null = null;

  markers: ListItems<Marker>;
  editableMarker: MarkerModel | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.markers = new ListItems<Marker>(MarkerModel, []);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCamera(camera: Camera) {
    this.camera = camera;
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
}
