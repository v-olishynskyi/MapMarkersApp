import * as React from 'react';
import { storeInstances } from '../store';

const storeContext = React.createContext(storeInstances);

export { storeContext };
