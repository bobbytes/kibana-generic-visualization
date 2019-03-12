import * as dotenv from 'dotenv';
import * as path from 'path';

import { getOsEnv } from './lib/env-utils';

// this is a workaround due to typescript compiler which copies package,json to output directory
// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json');

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    name: pkg.name,
    version: pkg.version,
    majorVersion: pkg.version.split('.')[0],
  },
  kibana: {
    version: getOsEnv('KIBANA_VERSION'),
  },
  logzIo: {
    host: getOsEnv('LOGZ_IO_API_HOST'),
    token: getOsEnv('LOGZ_IO_API_TOKEN'),
  },
};
