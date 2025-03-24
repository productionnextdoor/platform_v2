// "Production" enabled environment

import {
  Environment
} from './environment.types';

export const environment: Environment = {
  production: false,
  hmr: false,
  appConfig: 'appconfig.dev.json',
};
