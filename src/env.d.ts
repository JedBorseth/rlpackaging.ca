/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly SQUARE_ACCESS_TOKEN: string;
  readonly RESEND_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
