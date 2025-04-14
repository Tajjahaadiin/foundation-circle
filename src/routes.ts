import type { RouteConfig } from '@react-router/dev/routes';
import { index, route, layout } from '@react-router/dev/routes';

export default [
  layout('components/layouts/app-layouts.tsx', [
    index('routes/home.tsx'),
    route('search', 'routes/search-users.tsx'),
    route('follows', 'routes/follows.tsx'),
    route('profile/', 'routes/profile.tsx'),
    route('profile/:userId', 'routes/profile-user.tsx'),
    route('detail/:threadId', 'routes/thread-detail.tsx'),
  ]),
  layout('components/layouts/auth-layout.tsx', [
    route('login', 'routes/login.tsx'),
    route('register', 'routes/register.tsx'),
    route('forgot-password', 'routes/forgot-password.tsx'),
    route('reset-password', 'routes/reset-password.tsx'),
  ]),

  route('about', 'routes/about.tsx'),

  route('*', 'routes/404.tsx'),
] satisfies RouteConfig;
