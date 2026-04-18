# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Overview
This is a Next.js (App Router) project called `dmenu`. It uses Supabase for the backend, MUI and @toolpad/core for the UI, and Biome for linting and formatting.

## Dev Environment Setup
- Install dependencies: `npm install`
- Copy environment variables: `cp .env.example .env.local` (ensure Supabase keys are provided)
- Start Supabase: `npm run supabase:start`
- Start development server: `npm run dev`

## Build and Test Commands
- Build project: `npm run build`
- Start built project: `npm run start`
- Lint code: `npm run lint`
- Fix lint errors: `npm run lint:fix`
- Format code: `npm run format`
- Full check (format & lint): `npm run check`
- Generate Supabase types: `npm run generate:supabase`

## Code Style Guidelines
- **Component Style**:
  - All components must be arrow functions.
  - Props must be defined using a type named `{{ComponentName}}Props` (required only if there is at least one prop).
  - Use the `FC` type from React for component definitions.
  - The main file component should always be exported as default.
  
  ### Example
  ```typescript
  type ExampleProps = {
    // props definition
  }

  const Example: FC<ExampleProps> = () => {
    return null;
  };

  export default Example;
  ```

- **Dialogs and Notifications**:
  - Use `@toolpad/core` utilities for dialogs (`useDialogs`) and notifications (`useNotifications`).

- **Translations and Metadata**:
  - For page-specific content (e.g., marketing sections, titles, descriptions), use localized JSON files within the page directory (e.g., `app/[locale]/page-name/data.en.json`).
  - Fetch this data using a cached `pageData` function.
  - Use global `locales/*.json` files only for shared components and common UI strings.
  - Use the `Trans` component from `@/plugins/next-i18next/Trans` for any translated text that requires formatting (like `<strong>` tags).
  - Avoid hardcoding translation keys in large arrays within the component; instead, structure the local `data.*.json` to be mapped over.
  - Add translations only for pages inside `app/[locale]/**` and for components used inside these pages.

- **Component Patterns**:
  - For recurring items (e.g., features, list items), create a local component (e.g., `FeatureItem`) within the same file if it's page-specific.
  - Prefer mapping over data from local JSON files to render these components.

- **Skills**:
  - Always use the rules skills in the `.junie/skill/**` directory.

- **Forms**:
  - Use `formik` and `yup` for form handling and validation.

- **API and Supabase Calls**:
  - Prefer server actions for any Supabase call (and other API calls) unless specified otherwise.
  - Use `createClient` from `@/plugins/api/server` for server-side Supabase operations.

## Security Considerations
- Never commit `.env` or `.env.local` files.
- Ensure Supabase RLS (Row Level Security) policies are correctly configured.
- Do not expose sensitive service roles or admin keys in the client side.
