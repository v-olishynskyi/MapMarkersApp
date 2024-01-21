/**
 * @memberof ImageViewerWrapper
 * @typedef {Object} ImageViewerWrapperProps
 */
export type ImageViewerWrapperProps = {
  images: Array<{ uri: string }>;
};

export type ImageViewerRef = {
  show: (index?: number) => void;
};
