# vite-plugin-react-app-router

File-system based routing for React Router powered apps, tailored for Vite. 
Drop files in your source tree and get a Router out of the box with automatic code-splitting and sensible conventions for pages, layouts, templates, and dynamic routes.


## Highlights
- Zero-config route generation from your source folders
- React Router (createBrowserRouter) with React.lazy code-splitting
- Pages, nested Layouts, and optional Templates (data/layout boundaries)
- Dynamic `[param]` segments and virtual grouping `(folder)` segments
- Virtual module export: import your App Router from `vite-plugin-react-app-router/router`


## Install

Install the plugin (when published):

- npm: `npm i -D vite-plugin-react-app-router`
- pnpm: `pnpm add -D vite-plugin-react-app-router`
- yarn: `yarn add -D vite-plugin-react-app-router`

Local development (this repository): import the plugin from its local path in your Vite config as shown below.


## Usage

1) Add the plugin to Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginReactAppRouter from 'vite-plugin-react-app-router';

export default defineConfig({
  plugins: [
    react(),
    vitePluginReactAppRouter({
      // Where your routes live (defaults to "src")
      root: 'src',
    }),
  ],
});
```

If you are using the plugin directly from this repository, import it from the local path:

```ts
// vite.config.ts (local plugin path)
import vitePluginReactAppRouter from './src/plugins/vite-plugin-react-app-router';
```

2) Render the App Router in your entry

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from 'vite-plugin-react-app-router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
```

That `AppRouter` component is generated at build/dev time by the plugin and internally creates a `createBrowserRouter` with the routes it finds under your `root`.


## Route Conventions

The plugin scans your `root` directory (default: `src`) for these files in any folder:
- `page.*` — The page component for that folder. Creates an index route for the folder.
- `layout.*` — Optional layout for that folder. Wraps child routes with its element.
- `template.*` — Optional template for that folder. Adds a route boundary with a `shouldRevalidate` that re-runs when `pathname` changes; renders an `Outlet` and nests the folder’s page/children inside.

Supported segment types (based on folder names):
- Static segments: `src/about/page.tsx` ➜ `/about`
- Dynamic segments: `src/groups/[id]/page.tsx` ➜ `/groups/:id`
- Virtual (grouping) segments: `src/(private)/settings/page.tsx` ➜ `/settings` (group name is not part of the URL)

You can freely nest folders. Each folder becomes a layout route whose `path` comes from the folder segment name. A folder without a `layout.*` will behave like a pass-through layout using `React.Fragment`.


### Example

Given this structure:

```
src/
  layout.tsx
  page.tsx
  (private)/
    layout.tsx
    page.tsx
    groups/
      [id]/
        page.tsx
```

The generated routes roughly look like:

```tsx
createBrowserRouter([
  {
    path: '/',
    element: <Layout><Outlet/></Layout>,
    children: [
      { index: true, element: <HomePage/> },
      {
        path: '', // (private) is a virtual segment
        element: <PrivateLayout><Outlet/></PrivateLayout>,
        children: [
          { index: true, element: <PrivateHome/> },
          {
            path: 'groups',
            element: <React.Fragment><Outlet/></React.Fragment>,
            children: [
              {
                path: ':id',
                element: <React.Fragment><Outlet/></React.Fragment>,
                children: [
                  { index: true, element: <GroupPage/> }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]);
```

Notes:
- All elements are `React.lazy(() => import(...))` in the real generated code for automatic chunking.
- If a `template.*` file exists in a folder, a wrapper route is created with an `element` that renders the template and an `Outlet`, nesting the folder’s page/children under it.


## API

Plugin factory:

```ts
import type { Plugin } from 'vite';

type VitePluginReactAppRouterOptions = {
  /** Directory to scan for routes. Defaults to 'src'. */
  root?: string;
};

declare const vitePluginReactAppRouter: (options?: VitePluginReactAppRouterOptions) => Plugin;
export default vitePluginReactAppRouter;
```

Virtual module:
- `vite-plugin-react-app-router/router` — default export is a React component that renders a `RouterProvider` configured with the generated routes.


## How it works

- The plugin exposes a virtual module id `vite-plugin-react-app-router/router`.
- During dev/build, `load` generates a router file that:
  - Imports React, `createBrowserRouter`, `RouterProvider`, `Outlet` from `react-router`.
  - Defines routes based on your folder structure and matching `page|layout|template` files.
  - Uses `React.lazy` for every page/layout/template component to enable code-splitting.
  - Exports a default component that renders `<RouterProvider router={router} />`.


## Limitations and Notes
- Browser router only (no SSR). It calls `createBrowserRouter` under the hood.
- The plugin looks for files named exactly `page.*`, `layout.*`, or `template.*` (any extension supported by your tooling, e.g., `.tsx`, `.jsx`, `.ts`, `.js`).
- Virtual grouping folders must be wrapped in parentheses `(group)`. They do not contribute to the URL path.
- Dynamic segments are defined with square brackets `[param]`, which become `:param` in the URL.
- The automatically added `shouldRevalidate` inside template routes revalidates when pathname changes.


## Tips
- Start with just `page.tsx` files—add `layout.tsx` when you need shared UI/state between a folder’s pages.
- Use `(group)` folders to organize features without affecting URL structure.
- Co-locate loaders/actions with your pages using standard React Router patterns inside your page files.


## Example project configuration

This repository uses the plugin locally. See:
- `vite.config.ts` for plugin setup
- `src/main.tsx` for how the generated `AppRouter` is used
- `src/` for route examples including dynamic and virtual segments
