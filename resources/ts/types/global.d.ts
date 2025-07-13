import type { Route as routeFn } from "ziggy-js";

declare global {
  const route: routeFn;
  
  // Vite-specific type declarations
  interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string;
    [key: string]: any;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob(pattern: string): Record<string, () => Promise<any>>;
  }
}
