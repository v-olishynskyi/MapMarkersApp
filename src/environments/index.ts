import { Environment } from './types';

const envType = 'local';

const env = require(`./env.${envType}`).default;

export default env as Environment;
