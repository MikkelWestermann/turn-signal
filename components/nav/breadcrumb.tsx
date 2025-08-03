'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BaseBreadcrumb, DashboardBreadcrumb } from './breadcrumbs';

export function BreadcrumbNav() {
  const pathname = usePathname();

  // Build breadcrumbs based on current path
  const getBreadcrumbs = () => {
    if (pathname === '/admin') {
      return [<DashboardBreadcrumb key="dashboard" />];
    }
    if (pathname.startsWith('/admin/')) {
      const segments = pathname.split('/').filter(Boolean);
      const breadcrumbs = [
        <BaseBreadcrumb key="dashboard" title="Dashboard" href="/admin" />,
      ];

      if (segments.length > 1) {
        const pageName = segments[1];
        const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        breadcrumbs.push(
          <BaseBreadcrumb key={pageName} title={title} isActive={true} />,
        );
      }

      return breadcrumbs;
    }
    // Default fallback
    return [
      <BaseBreadcrumb key="dashboard" title="Dashboard" href="/" />,
      <BaseBreadcrumb key="page" title="Page" isActive={true} />,
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            {breadcrumb}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
