"use client";

import { authClient } from "@/auth/client";
import { AppSidebar } from "@/components/nav/menu";
import { BreadcrumbNav } from "@/components/nav/breadcrumb";
import { SidebarProvider } from "@/components/ui/sidebar";
import { OrganizationSelector } from "@/components/organization-selector";
import { OrganizationSelectorPage } from "@/components/organization-selector-page";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const { data: activeOrganization, isPending: isLoadingOrg } =
    authClient.useActiveOrganization();

  // Show loading state
  if (isPending || isLoadingOrg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login");
  }

  // Show organization selector if no active organization
  if (!activeOrganization) {
    return <OrganizationSelectorPage />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b bg-background px-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-48">
                <OrganizationSelector />
              </div>
              <BreadcrumbNav />
            </div>

            <div>
              <ModeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="mx-auto p-6 max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
