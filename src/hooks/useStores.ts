import * as React from 'react';
import { storeContext } from '../context';

export default function () {
  return React.useContext(storeContext);
}
