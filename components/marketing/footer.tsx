import Link from 'next/link';
import { Github, Mail } from 'lucide-react';
import Logo from '@/components/logo';

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center space-x-3">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-semibold text-foreground">
                Turn Signal
              </span>
            </div>
            <p className="mb-4 max-w-md text-muted-foreground">
              Transform your GitHub issues into beautiful, public roadmaps that
              keep your users informed about what's coming next. Open source and
              free forever.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/MikkelWestermann/turn-signal"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/MikkelWestermann/turn-signal/issues"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
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
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://github.com/MikkelWestermann/turn-signal"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/MikkelWestermann/turn-signal/issues"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issues & Support
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/MikkelWestermann/turn-signal/issues/new?template=feature_request.md"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request Feature
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/MikkelWestermann/turn-signal/issues/new?template=bug_report.md"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Report Bug
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} Turn Signal. Open source and
                free forever.
              </p>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link
                href="https://github.com/MikkelWestermann/turn-signal"
                className="hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
