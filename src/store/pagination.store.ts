import { PaginationMeta, PaginationResponse } from '@utils/types';
import {
  IObservableArray,
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

type FetchFunction<T> = (
  page: number,
  limit: number,
) => Promise<PaginationResponse<T>>;

type Pages<T> = Record<number, IObservableArray<T>>;

export class PaginationStore<TData, TModel> {
  isLoading: boolean = false;
  isFetchingNextPage: boolean = false;

  meta: PaginationMeta | null = null;
  pages: Pages<TModel> = {};

  fetchFunction: FetchFunction<TData>;
  Model: any;

  constructor(fetchFunction: FetchFunction<TData>, Model: any) {
    this.fetchFunction = fetchFunction;
    this.Model = Model;

    makeObservable(
      this,
      {
        isLoading: observable,
        hasNextPage: computed,
        isFetchingNextPage: observable,
        meta: observable,
        loadData: action.bound,
        fetchNextPage: action.bound,
        data: computed,
        pages: observable,
      },
      { autoBind: true },
    );
  }

  async loadData(page: number = 0, limit: number = 10) {
    try {
      this.isLoading = true;

      const response = await this.fetchFunction(page, limit);
      const items = observable.array<TModel>(
        response.data.map(item => new this.Model(item)),
      );

      runInAction(() => {
        this.meta = response.meta;
        this.pages = { ...this.pages, [page]: items };
      });
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async fetchNextPage() {
    try {
      this.isFetchingNextPage = true;

      const page = this.meta!.next_page!;

      const response = await this.fetchFunction(page, this.meta?.per_page!);

      const items = observable.array<TModel>(
        response.data.map(item => new this.Model(item)),
      );

      runInAction(() => {
        this.meta = response.meta;
        this.pages = { ...this.pages, [page]: items };
      });
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => {
        this.isFetchingNextPage = false;
      });
    }
  }

  get hasNextPage() {
    if (!this.meta) {
      return false;
    }

    return !!this.meta?.next_page;
  }

  get data() {
    return Object.keys(this.pages).reduce((arr, key) => {
      arr.replace([...arr, ...this.pages[key]]);
      return arr;
    }, observable.array<TModel>([]));
  }
}
