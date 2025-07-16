import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./hooks/use-theme";

const appName = import.meta.env.VITE_APP_NAME || "Atom Starter Kit";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ThemeProvider>
        <App {...props} />
      </ThemeProvider>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
