import { cn } from "@/lib/utils";

export default function Heading({
  title,
  description,
  size = "default",
  center = false,
}: {
  title: string;
  description?: string;
  size?: "default" | "small" | "large";
  center?: boolean;
}) {
  return (
    <header
      className={cn("flex flex-col mb-3 lg:mb-8", {
        "space-y-0.5": size === "default",
        "space-y-1": size === "large",
        "items-center text-center": center,
      })}
    >
      <h1
        className={cn({
          "text-xl font-semibold tracking-tight": size === "default",
          "text-base font-medium": size === "small",
          "text-2xl font-bold": size === "large",
        })}
      >
        {title}
      </h1>
      {description && (
        <p
          className={cn("text-muted-foreground", {
            "text-sm": size === "default",
            "text-xs": size === "small",
            "text-base": size === "large",
          })}
        >
          {description}
        </p>
      )}
    </header>
  );
}
