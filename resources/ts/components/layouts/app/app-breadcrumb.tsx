import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppBreadcrumbItem } from "@/types";
import { Link } from "@inertiajs/react";
import { Fragment } from "react/jsx-runtime";

type AppBreadcrumbProps = {
  items: AppBreadcrumbItem[];
};

export default function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            <BreadcrumbItem>
              {items.length - 1 === index && (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
              {items.length - 1 !== index && (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
