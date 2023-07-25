import { PaginationMeta, PaginationResponse } from '@types';
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
  search?: string,
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
        initialLoadData: action.bound,
        fetchNextPage: action.bound,
        data: computed,
        pages: observable,
      },
      { autoBind: true },
    );
  }

  async initialLoadData(
    page: number = 0,
    limit: number = 10,
    search: string = '',
  ) {
    try {
      this.isLoading = true;

      const response = await this.fetchFunction(page, limit, search);
      const items = observable.array<TModel>(
        response.data.map(item => new this.Model(item)),
      );

      runInAction(() => {
        this.meta = response.meta;
        this.pages = { [page]: items };
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
