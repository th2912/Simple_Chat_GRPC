// import { AuthenticationPage } from './containers';

import AccessForm from './containers/AccessForm';

export const authRoutes = [
  {
    key: 'router-authentication',
    title: 'Authentication',
    description: 'Authentication',
    component: AccessForm,
    path: ['/login'],
  },
];
