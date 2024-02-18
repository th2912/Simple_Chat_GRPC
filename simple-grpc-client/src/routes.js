import { authRoutes } from './modules/Auth/routes';
import { chatRoutes } from './modules/ChatRoom/routes';

export const appRoutes = [...authRoutes, ...chatRoutes];
