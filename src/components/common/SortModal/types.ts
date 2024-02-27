import { SortOption } from '@common/types';

/**
 * @memberof SortModal
 * @typedef {Object} SortModalProps
 */
export type SortModalProps = {
  sortIndex: number;
  sortOptions: Array<SortOption>;
  setSortIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type SortModalRef = {
  close: VoidFunction;
  open: VoidFunction;
};
