import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import { user } from './models/_user';
import { slides } from './models/_slides';
import { sheets } from './models/_sheets';
import { presentation } from './models/_presentation';
import { presentations } from './models/_presentations';
import { company } from './models/_company';
import { sensor } from './models/_sensor';
import { dashboard_header } from './models/_dashboard_header';
import { table } from './models/_table';
import { alerts } from './models/_alerts';
import { accountManagers } from './models/_account_managers';
import { revenue_insight } from './models/_revenue_insight';

const loading = createLoadingPlugin();

const store = init({
  models: {
    user,
    slides,
    sheets,
    presentation,
    company,
    sensor,
    dashboard_header,
    presentations,
    table,
    alerts,
    accountManagers,
    revenue_insight
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
