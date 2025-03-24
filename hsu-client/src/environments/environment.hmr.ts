// "Hot Module Replacement" enabled environment

import {
  Environment
} from './environment.types';

export const environment: Environment = {
  production: false,
  hmr: true,
  appConfig: 'appconfig.json',
};
