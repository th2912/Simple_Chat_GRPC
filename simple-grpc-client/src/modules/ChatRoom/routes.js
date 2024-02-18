// import { AuthenticationPage } from './containers';

import { ChatRoom } from './containers';

export const chatRoutes = [
  {
    key: 'router-chatRoom',
    title: 'ChatRoom',
    description: 'ChatRoom',
    component: ChatRoom,
    private: true,
    path: ['/'],
  },
];
