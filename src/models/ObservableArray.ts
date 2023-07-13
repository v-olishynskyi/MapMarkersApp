import { IObservableArray, makeAutoObservable, observable } from 'mobx';

export default class ObservableArray<TModel, TInitialItems = any> {
  items = observable.array<TModel>([]);

  constructor(items: TInitialItems[], Constructor) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.set(items, Constructor);
  }

  set(array: TInitialItems[], Constructor) {
    this.items.replace(array.map(item => new Constructor(item)));
  }
}
