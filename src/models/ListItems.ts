import { Entities } from '@common/types/entities';
import { EntityToModel, ModelConstructor } from '@models/types';
import { makeAutoObservable } from 'mobx';

export default class ListItems<T extends Entities> {
  items: EntityToModel<T>[] = [];

  constructor(Constructor: ModelConstructor<T>, list: Array<T>) {
    makeAutoObservable(this, {}, { autoBind: true });

    // @ts-ignore
    this.items = list.map<EntityToModel<T>>(item => new Constructor(item));

    return this;
  }

  push(item: EntityToModel<T>) {
    this.items.push(item);

    return this;
  }

  remove(index: number) {
    const newItems = this.items.filter((_, idx) => index !== idx);

    this.items = newItems;

    return this;
  }
}
