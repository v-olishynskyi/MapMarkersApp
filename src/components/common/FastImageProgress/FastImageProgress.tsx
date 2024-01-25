/**
 * @namespace FastImageProgress
 * @category Components
 * @subcategory Common
 *  */
import { createImageProgress } from 'react-native-image-progress';
import FastImage, { FastImageProps } from 'react-native-fast-image';

/**
 * FastImageProgress
 *
 * @memberof
 * @param {FastImageProgressProps} params
 *
 * @example
 * // How to use FastImageProgress:
 *  <FastImageProgress />
 */
const FastImageProgress = createImageProgress<FastImageProps>(FastImage);
export default FastImageProgress;
