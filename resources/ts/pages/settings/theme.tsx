import SettingsLayout from "@/components/layouts/settings/settings-layout";
import Heading from "@/components/ui/heading";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Theme, useTheme } from "@/hooks/use-theme";
import { Moon, Sun, SunMoon } from "lucide-react";
import route from "ziggy-js";

export default function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  return (
    <SettingsLayout
      title="Theme Settings"
      breadcrumbs={[
        { label: "Settings", href: route("settings") },
        { label: "Theme", href: route("settings.theme") },
      ]}
    >
      <Heading
        size="small"
        title="Theme Settings"
        description="Customize the appearance of your application."
      />
      <ToggleGroup
        type="single"
        value={theme}
        onValueChange={(value: Theme) => {
          if (value) {
            setTheme(value);
          }
        }}
        className="border border-muted-foreground"
      >
        <ToggleGroupItem value="light" className="px-4">
          <Sun className="size-4" />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" className="px-4">
          <Moon className="size-4" />
          Dark
        </ToggleGroupItem>
        <ToggleGroupItem value="system" className="px-4">
          <SunMoon className="size-4" />
          System
        </ToggleGroupItem>
      </ToggleGroup>
    </SettingsLayout>
  );
}
