import type { RouteConfig } from '@react-router/dev/routes';
import { index, route } from '@react-router/dev/routes';
export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('login', 'routes/login.tsx'),
  route('register', 'routes/register.tsx'),
  route('*', 'routes/404.tsx'),
] satisfies RouteConfig;
