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

  set(list: EntityToModel<T>[]) {
    this.items = list;
  }

  push(item: EntityToModel<T>) {
    this.items.push(item);

    return this;
  }

  unshift(item: EntityToModel<T>) {
    this.items.unshift(item);

    return this;
  }

  remove(index: number) {
    const newItems = this.items.filter((_, idx) => index !== idx);

    this.items = newItems;

    return this;
  }

  replace(index: number, newItem: EntityToModel<T>) {
    const isIndexExist = index >= 0 && index <= this.items.length - 1;

    if (!isIndexExist) {
      return;
    }

    const newItems = this.items;
    newItems.splice(index, 1, newItem);

    this.items = newItems;
  }
}
