import Link from 'next/link';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

interface BreadcrumbItemProps {
  title: string;
  href?: string;
  isActive?: boolean;
}

export function BaseBreadcrumb({
  title,
  href,
  isActive = false,
}: BreadcrumbItemProps) {
  return (
    <BreadcrumbItem>
      {isActive ? (
        <BreadcrumbPage>{title}</BreadcrumbPage>
      ) : (
        <BreadcrumbLink asChild>
          <Link href={href!}>{title}</Link>
        </BreadcrumbLink>
      )}
    </BreadcrumbItem>
  );
}
