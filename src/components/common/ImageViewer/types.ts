/**
 * @memberof ImageViewerWrapper
 * @typedef {Object} ImageViewerWrapperProps
 */
export type ImageViewerProps = {
  images: Array<string>;
};

export type ImageViewerRef = {
  show: (index?: number) => void;
};
