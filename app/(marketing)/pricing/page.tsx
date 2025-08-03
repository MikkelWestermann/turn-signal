import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Github, Cloud, Server, Check } from 'lucide-react';

import { BackgroundGrid } from '@/components/marketing/background-grid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Turn Signal Roadmap Tool',
  description:
    'Turn Signal is completely free! Choose between self-hosting for complete control or using our cloud platform for simplicity. Both options are free and open source.',
  keywords: [
    'roadmap pricing',
    'free roadmap tool',
    'self-host',
    'cloud platform',
    'open source',
    'GitHub integration',
  ],
  openGraph: {
    title: 'Pricing - Turn Signal Roadmap Tool',
    description:
      'Turn Signal is completely free! Choose between self-hosting for complete control or using our cloud platform for simplicity.',
    type: 'website',
    url: 'https://turn-signal.co/pricing',
    siteName: 'Turn Signal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Turn Signal Roadmap Tool',
    description:
      'Turn Signal is completely free! Choose between self-hosting for complete control or using our cloud platform for simplicity.',
  },
};

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center space-x-3">
    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center border-2 bg-green-500 shadow-sm dark:bg-green-600">
      <Check className="h-3 w-3 text-white" />
    </div>
    <span className="text-gray-700 dark:text-gray-300">{children}</span>
  </div>
);

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-background">
        <BackgroundGrid />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mb-16 text-center lg:mb-24">
            <h1 className="mb-6 text-4xl font-black text-foreground lg:mb-8 lg:text-6xl">
              Pricing
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 lg:mb-12 lg:text-2xl dark:text-gray-400">
              Choose how you want to use Turn Signal. Self-host for complete
              control, or use our cloud platform for simplicity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Card className="border-4 border-black bg-card shadow-4xl dark:border-white">
              <CardHeader className="pb-6 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border-3 border-black bg-primary/20 shadow-3xl dark:border-white dark:bg-primary/30">
                  <Server className="h-8 w-8 text-foreground" />
                </div>
                <CardTitle className="mb-4 text-3xl font-black text-foreground lg:text-4xl">
                  Self Host
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 lg:text-xl dark:text-gray-400">
                  Deploy Turn Signal on your own infrastructure for complete
                  control and privacy.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="mb-2 text-4xl font-black text-foreground lg:text-5xl">
                    FREE
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Open source and free forever
                  </p>
                </div>

                <div className="space-y-4">
                  <FeatureItem>Complete source code access</FeatureItem>
                  <FeatureItem>Full control over your data</FeatureItem>
                  <FeatureItem>Customize to your needs</FeatureItem>
                  <FeatureItem>No usage limits</FeatureItem>
                  <FeatureItem>Deploy anywhere</FeatureItem>
                </div>

                <div className="pt-6">
                  <Link
                    href="https://github.com/MikkelWestermann/turn-signal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 w-full border-3 border-black bg-background text-lg font-bold shadow-3xl transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-muted hover:shadow-lg dark:border-white"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      View on GitHub
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-black bg-card shadow-4xl dark:border-white">
              <CardHeader className="pb-6 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border-3 border-black bg-primary/20 shadow-3xl dark:border-white dark:bg-primary/30">
                  <Cloud className="h-8 w-8 text-foreground" />
                </div>
                <CardTitle className="mb-4 text-3xl font-black text-foreground lg:text-4xl">
                  Cloud
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 lg:text-xl dark:text-gray-400">
                  Use Turn Signal as a hosted service. Simple setup, automatic
                  updates, and managed infrastructure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="mb-2 text-4xl font-black text-foreground lg:text-5xl">
                    FREE
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    No credit card required
                  </p>
                </div>

                <div className="space-y-4">
                  <FeatureItem>Instant setup</FeatureItem>
                  <FeatureItem>Automatic updates</FeatureItem>
                  <FeatureItem>Managed infrastructure</FeatureItem>
                  <FeatureItem>Managed GitHub integration</FeatureItem>
                  <FeatureItem>Public roadmaps</FeatureItem>
                </div>

                <div className="pt-6">
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="h-14 w-full border-2 border-black bg-primary text-lg font-bold text-primary-foreground shadow-3xl transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-primary/90 hover:shadow-lg dark:border-white"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-6 text-3xl font-black text-foreground lg:mb-8 lg:text-5xl">
              Which option is right for you?
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 lg:text-xl dark:text-gray-400">
              Both options give you the same powerful features. The choice
              depends on your preferences for control vs. convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center border-3 border-black bg-primary/20 shadow-lg dark:border-white dark:bg-primary/30">
                  <Server className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                    Choose Self Host if you:
                  </h3>
                </div>
              </div>
              <div className="ml-16 space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  • Want complete control over your data
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Have specific security requirements
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Want to customize the application
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Have the technical expertise to deploy
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Want to avoid vendor lock-in
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center border-3 border-black bg-primary/20 shadow-lg dark:border-white dark:bg-primary/30">
                  <Cloud className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                    Choose Cloud if you:
                  </h3>
                </div>
              </div>
              <div className="ml-16 space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  • Want to get started quickly
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Don't want to manage infrastructure
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Prefer automatic updates
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Want reliable uptime guarantees
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Focus on your product, not ops
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="mx-auto max-w-4xl border-4 border-black bg-card shadow-4xl dark:border-white">
            <CardHeader className="pb-6 text-center">
              <CardTitle className="mb-4 text-3xl font-black text-foreground lg:text-4xl">
                Ready to get started?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 lg:text-xl dark:text-gray-400">
                Both options are completely free. Start building your roadmap
                today.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="h-14 border-2 border-black bg-primary px-8 text-lg font-bold text-primary-foreground shadow-3xl transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-primary/90 hover:shadow-lg dark:border-white"
                  >
                    Try Cloud Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/MikkelWestermann/turn-signal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 border-3 border-black bg-background px-8 text-lg font-bold shadow-3xl transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-muted hover:shadow-lg dark:border-white"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Self Host
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
