/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CORE_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
