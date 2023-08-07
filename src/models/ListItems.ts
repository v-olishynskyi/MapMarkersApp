import { Entities } from '@common/types/entities';
import { EntityToModel } from '@models/types';
import { makeAutoObservable } from 'mobx';

export default class ListItems<T extends Entities> {
  items: EntityToModel<T>[] = [];

  constructor(Constructor: any, list: Array<T>) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.items = list.map<EntityToModel<T>>(item => new Constructor(item));

    return this;
  }

  push(item: EntityToModel<T>) {
    this.items.push(item);

    return this;
  }
}
