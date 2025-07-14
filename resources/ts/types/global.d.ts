import type { Route as routeFn } from "ziggy-js";

declare global {
  const route: routeFn;

  interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string;
    [key: string]: unknown;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob(pattern: string): Record<string, () => Promise<unknown>>;
  }
}
