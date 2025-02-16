import { Provider } from '@/components/ui/provider';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
// import globalCss from '@/styles/global.css?url';

export default function Root() {
  return (
    <>
      <Provider>
        <Outlet />
      </Provider>
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        ></link>
        {/* <link rel="stylesheet" href={globalCss} /> */}
        <title>Circle</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
