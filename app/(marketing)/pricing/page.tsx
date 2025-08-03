import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Github, Cloud, Server, Check } from "lucide-react";

import { BackgroundGrid } from "@/components/marketing/background-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Turn Signal Roadmap Tool",
  description:
    "Turn Signal is completely free! Choose between self-hosting for complete control or using our cloud platform for simplicity. Both options are free and open source.",
  keywords: [
    "roadmap pricing",
    "free roadmap tool",
    "self-host",
    "cloud platform",
    "open source",
    "GitHub integration",
  ],
  openGraph: {
    title: "Pricing - Turn Signal Roadmap Tool",
    description:
      "Turn Signal is completely free! Choose between self-hosting for complete control or using our cloud platform for simplicity.",
    type: "website",
    url: "https://turn-signal.co/pricing",
    siteName: "Turn Signal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - Turn Signal Roadmap Tool",
    description:
      "Turn Signal is completely free! Choose between self-hosting for complete control or using our cloud platform for simplicity.",
  },
};

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center space-x-3">
    <div className="w-5 h-5 bg-green-500 dark:bg-green-600 border-2 shadow-sm flex items-center justify-center flex-shrink-0">
      <Check className="w-3 h-3 text-white" />
    </div>
    <span className="text-gray-700 dark:text-gray-300">{children}</span>
  </div>
);

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-background overflow-hidden">
        <BackgroundGrid />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-6 lg:mb-8">
              Pricing
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 lg:mb-12 max-w-3xl mx-auto">
              Choose how you want to use Turn Signal. Self-host for complete
              control, or use our cloud platform for simplicity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <Card className="bg-card border-4 border-black dark:border-white shadow-4xl">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary/20 dark:bg-primary/30 border-3 border-black dark:border-white shadow-3xl flex items-center justify-center mx-auto mb-6">
                  <Server className="w-8 h-8 text-foreground" />
                </div>
                <CardTitle className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                  Self Host
                </CardTitle>
                <CardDescription className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                  Deploy Turn Signal on your own infrastructure for complete
                  control and privacy.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-foreground mb-2">
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
                      className="w-full h-14 text-lg font-bold border-3 border-black dark:border-white bg-background hover:bg-muted shadow-3xl hover:shadow-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      View on GitHub
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-4 border-black dark:border-white shadow-4xl">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary/20 dark:bg-primary/30 border-3 border-black dark:border-white shadow-3xl flex items-center justify-center mx-auto mb-6">
                  <Cloud className="w-8 h-8 text-foreground" />
                </div>
                <CardTitle className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                  Cloud
                </CardTitle>
                <CardDescription className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                  Use Turn Signal as a hosted service. Simple setup, automatic
                  updates, and managed infrastructure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-foreground mb-2">
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
                      className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-black dark:border-white shadow-3xl hover:shadow-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6 lg:mb-8">
              Which option is right for you?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Both options give you the same powerful features. The choice
              depends on your preferences for control vs. convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-3 border-black dark:border-white shadow-lg flex items-center justify-center">
                  <Server className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    Choose Self Host if you:
                  </h3>
                </div>
              </div>
              <div className="space-y-3 ml-16">
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
                <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-3 border-black dark:border-white shadow-lg flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    Choose Cloud if you:
                  </h3>
                </div>
              </div>
              <div className="space-y-3 ml-16">
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-card border-4 border-black dark:border-white shadow-4xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                Ready to get started?
              </CardTitle>
              <CardDescription className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                Both options are completely free. Start building your roadmap
                today.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-black dark:border-white shadow-3xl hover:shadow-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
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
                    className="h-14 px-8 text-lg font-bold border-3 border-black dark:border-white bg-background hover:bg-muted shadow-3xl hover:shadow-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
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
