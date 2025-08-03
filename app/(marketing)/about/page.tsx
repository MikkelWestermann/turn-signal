import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import { BackgroundGrid } from "@/components/marketing/background-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Story Behind Turn Signal",
  description:
    "Learn about the story behind Turn Signal, an open source roadmap tool that transforms GitHub issues into beautiful public roadmaps. Built for transparency and community-driven development.",
  keywords: [
    "roadmap tool",
    "GitHub integration",
    "open source",
    "product development",
    "feature requests",
    "user feedback",
  ],
  openGraph: {
    title: "The Story Behind Turn Signal",
    description:
      "Learn about the story behind Turn Signal, an open source roadmap tool that transforms GitHub issues into beautiful public roadmaps.",
    type: "website",
    url: "https://turn-signal.co/about",
    siteName: "Turn Signal",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Story Behind Turn Signal",
    description:
      "Learn about the story behind Turn Signal, an open source roadmap tool that transforms GitHub issues into beautiful public roadmaps.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-background overflow-hidden">
        <BackgroundGrid />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-6 lg:mb-8">
              About Turn Signal
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 lg:mb-12 max-w-3xl mx-auto">
              The story behind building a simple, open source roadmap tool
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              I was working on several projects and kept running into the same
              problem: feature requests from users were scattered everywhere.
              They'd come in through support tickets, chat messages, emails, and
              random notes. It was impossible to keep track of what users
              actually wanted.
            </p>
            <p>
              I'd build features that I thought were important, only to find out
              later that users were asking for something completely different.
              The feedback was there, but it was buried in different places and
              impossible to prioritize.
            </p>
            <p>
              I needed a simple way to centralize all these requests and turn
              them into a clear roadmap that users could see and engage with.
            </p>
            <p>
              But having yet another tool to keep up to date with was not an
              option. I wanted something that would work seamlessly with GitHub
              since that's where most of my development work happens.
            </p>
            <p>
              Turn Signal is built as an open source project because I believe
              in transparency and community-driven development. You can see
              exactly how it works, contribute features, and help shape the
              future of roadmap management.
            </p>
            <p>
              The goal is to make it easy for any developer or team to keep
              their users informed about what's coming next, while building
              features that users actually want.
            </p>
            <p>
              Turn Signal is completely free and open source. Whether you're a
              solo developer or part of a team, you can use it to build better
              products by understanding what your users want.
            </p>
            <p>
              If you've ever struggled with scattered feature requests or wanted
              a simple way to share your roadmap with users, Turn Signal is for
              you.
            </p>
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
              Join the community and start building better products with Turn
              Signal.
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
