import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function VerticalMenuListItem({
  className,
  active,
  ...props
}: {
  active?: boolean;
  disabled?: boolean;
} & ComponentProps<"li">) {
  return (
    <li
      data-slot="vertical-menu-item"
      className={cn(
        "w-full *:w-full py-2 px-2 lg:px-4 inline-flex items-start gap-1.5 hover:text-foreground transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        {
          "cursor-not-allowed opacity-60": props.disabled,
          "text-foreground bg-accent hover:bg-accent/50 rounded-md": active,
        },
        className
      )}
      {...props}
    />
  );
}

export function VerticalMenuList({
  className,
  ...props
}: {
  className?: string;
} & ComponentProps<"ul">) {
  return (
    <ul
      data-slot="vertical-menu"
      className={cn(
        "text-muted-foreground flex flex-col items-start gap-1 text-sm break-words",
        className
      )}
      {...props}
    />
  );
}

export function VerticalMenuHeader({
  className,
  ...props
}: {
  className?: string;
} & ComponentProps<"h3">) {
  return (
    <h3
      data-slot="vertical-menu-header"
      className={cn("text-sm font-semibold text-foreground", className)}
      {...props}
    />
  );
}

export function VerticalMenuDescription({
  className,
  ...props
}: {
  className?: string;
} & ComponentProps<"p">) {
  return (
    <p
      data-slot="vertical-menu-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function VerticalMenu({
  className,
  ...props
}: {
  className?: string;
} & ComponentProps<"nav">) {
  return (
    <nav
      data-slot="vertical-menu"
      className={cn("w-full flex flex-col gap-2", className)}
      {...props}
    />
  );
}
