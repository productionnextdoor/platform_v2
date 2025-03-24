// "Production" enabled environment

import {
  Environment
} from './environment.types';

export const environment: Environment = {
  production: true,
  hmr: false,
  appConfig: 'appconfig.k8s.json',
};
