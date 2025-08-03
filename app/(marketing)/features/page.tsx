import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Github,
  Globe,
  Zap,
  Users,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { BackgroundGrid } from "@/components/marketing/background-grid";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-background overflow-hidden">
        <BackgroundGrid />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-6 lg:mb-8">
              Features
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 lg:mb-12 max-w-3xl mx-auto">
              Everything you need to turn your GitHub issues into a beautiful
              public roadmap
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-2 border-black dark:border-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Github className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  GitHub Integration
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Connect your GitHub repository and automatically sync all your
                  issues and pull requests. No manual updates needed - your
                  roadmap stays current as you work on GitHub.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-2 border-black dark:border-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Public Roadmaps
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Create beautiful, customizable roadmaps that your users can
                  view and interact with. Share your development plans
                  transparently and keep everyone informed about what's coming
                  next.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-2 border-black dark:border-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Real-time Updates
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your roadmap updates automatically as you work on GitHub. When
                  you close an issue, update a milestone, or create a new pull
                  request, your roadmap reflects those changes instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-2 border-black dark:border-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  User Engagement
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Let users vote on features and stay engaged with your product
                  development. See which features matter most to your community
                  and prioritize accordingly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-2 border-black dark:border-white shadow-sm flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Feedback Loop
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Build better products by understanding what your users want
                  most. Centralize feature requests and feedback in one place
                  that's always up to date.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-2 border-black dark:border-white shadow-sm flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Open Source
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Turn Signal is fully open source. View our code, contribute
                  features, and help us build the future of roadmap management.
                  Completely free to use and self-host.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8">
              Start building better products with Turn Signal today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-black dark:border-white shadow-3xl hover:shadow-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
                >
                  Try Turn Signal Free
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
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
