/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly SQUARE_ACCESS_TOKEN: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }