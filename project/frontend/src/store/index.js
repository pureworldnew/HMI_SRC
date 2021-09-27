import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import { user } from './models/_user';
import { sensor } from './models/_sensor';
import { dashboard_header } from './models/_dashboard_header';
import { table } from './models/_table';
import { alerts } from './models/_alerts';
import { accountManagers } from './models/_account_managers';
import { notifications } from './models/_notifications';

const loading = createLoadingPlugin();

const store = init({
  models: {
    user,
    sensor,
    dashboard_header,
    table,
    alerts,
    accountManagers,
    notifications
  },
  plugins: [loading]
});

export default store;

// rematch/core
// https://rematch.github.io/rematch/#/README

// rematch/loading
// https://rematch.github.io/rematch/#/plugins/loading

// rematch/plugins
// https://rematch.github.io/rematch/#/plugins
