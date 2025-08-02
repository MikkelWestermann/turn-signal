"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import Logo from "@/components/logo";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function MarketingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-semibold text-foreground">
                Turn Signal
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <Logo className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Turn Signal
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Modern application with secure authentication and
                              comprehensive admin dashboard.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/features" title="Features">
                        Explore our powerful features and capabilities.
                      </ListItem>
                      <ListItem href="/pricing" title="Pricing">
                        Simple, transparent pricing for all your needs.
                      </ListItem>
                      <ListItem href="/roadmap" title="Roadmap">
                        See what we're building next.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/docs" title="Documentation">
                        Learn how to use Turn Signal effectively.
                      </ListItem>
                      <ListItem href="/api" title="API Reference">
                        Complete API documentation and examples.
                      </ListItem>
                      <ListItem href="/tutorials" title="Tutorials">
                        Step-by-step guides to get you started.
                      </ListItem>
                      <ListItem href="/blog" title="Blog">
                        Latest updates, tips, and insights.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/admin">
              <Button>Admin Dashboard</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">Product</h3>
                <div className="space-y-1">
                  <Link
                    href="/features"
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                  <Link
                    href="/pricing"
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/roadmap"
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Roadmap
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">
                  Resources
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/docs"
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                  <Link
                    href="/api"
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    API Reference
                  </Link>
                  <Link
                    href="/tutorials"
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Tutorials
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </div>
              </div>
              <div className="space-y-1">
                <Link
                  href="/about"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </div>
              <div className="pt-4 space-y-2">
                <div className="flex justify-center">
                  <ModeToggle />
                </div>
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/admin" className="block">
                  <Button className="w-full">Admin Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
