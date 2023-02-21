// import { makeAutoObservable } from 'mobx';
import { api } from '../api';
import { CreateCategoryParams } from '../api/categories';
import { Category } from './models';

export default class CategoryModel {
  id: Category['_id'] = '';
  label: Category['label'] = '';
  value: Category['value'] = '';
  isAccept?: Category['isAccept'];

  createdAt?: Category['createdAt'];
  updatedAt?: Category['updatedAt'];

  constructor(responseCategory: Category) {
    this.handleResponse(responseCategory);
  }

  private handleResponse(responseCategory: Category) {
    if (responseCategory._id) {
      this.id = responseCategory._id;
    }
    if (responseCategory.label) {
      this.label = responseCategory.label;
    }
    if (responseCategory.value) {
      this.value = responseCategory.value;
    }
    if (responseCategory.isAccept) {
      this.isAccept = responseCategory.isAccept;
    }
    if (responseCategory.createdAt) {
      this.createdAt = responseCategory.createdAt;
    }
    if (responseCategory.updatedAt) {
      this.updatedAt = responseCategory.updatedAt;
    }
  }

  static create(input: CreateCategoryParams) {
    return api.createCategory(input);
  }
}
