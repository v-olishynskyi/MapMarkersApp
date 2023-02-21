import { makeObservable, observable } from 'mobx';
import {
  ModelConstructor,
  ResponseModels,
  ResponseModelToModel,
} from '../models/types';

export class ListItems<T extends ResponseModels> {
  items: Array<ResponseModelToModel<T>> = [];

  constructor(Constructor: ModelConstructor<T>, list: Array<T>) {
    makeObservable(this, {
      items: observable,
    });

    this.items = observable.array(list.map(item => new Constructor(item)));
  }
}
