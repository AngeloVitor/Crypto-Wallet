/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_coingeckoapicode: string
  // more env variables...
}

interface Window {
  ethereum: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
