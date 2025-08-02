import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Logo from "@/components/logo";

export function MarketingFooter() {
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-semibold text-foreground">
                Turn Signal
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              A modern application with secure authentication and comprehensive
              admin dashboard. Built with Next.js and Better Auth for
              enterprise-grade security.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:contact@turnsignal.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>&copy; 2024 Turn Signal. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
