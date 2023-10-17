/**
 * @memberof HeaderButton
 * @typedef {Object} HeaderButtonProps
 */
export type HeaderButtonProps = {
  canGoBack: boolean;
  label: string;
  color: string;
  loading?: boolean;
  onPress?: VoidFunction | (() => Promise<any>);
  backRoute: any;
  disabled?: boolean;
};
