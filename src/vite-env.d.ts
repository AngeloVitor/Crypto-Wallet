/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_coingeckoapicode: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
