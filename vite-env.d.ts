/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_PUBLIC_SITE_URL: string
  readonly VITE_PUBLIC_GOOGLE_ANALYTICS_ID: string
  readonly VITE_PUBLIC_SUPABASE_URL: string
  readonly VITE_PUBLIC_SUPABASE_ANON_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}