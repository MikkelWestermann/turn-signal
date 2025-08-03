import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Github,
  MessageSquare,
  Bug,
  Lightbulb,
} from "lucide-react";

import { BackgroundGrid } from "@/components/marketing/background-grid";

const ContactCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  href,
  variant = "default",
}: {
  icon: any;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  variant?: "default" | "outline";
}) => (
  <Card className="bg-card border-4 border-black dark:border-white shadow-4xl">
    <CardHeader className="text-center pb-6">
      <div className="w-16 h-16 bg-primary/20 dark:bg-primary/30 border-3 border-black dark:border-white shadow-3xl flex items-center justify-center mx-auto mb-6">
        <Icon className="w-8 h-8 text-foreground" />
      </div>
      <CardTitle className="text-2xl lg:text-3xl font-black text-foreground mb-4">
        {title}
      </CardTitle>
      <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent className="text-center">
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          variant={variant}
          className={`h-14 px-8 text-lg font-bold border-2 border-black dark:border-white shadow-3xl hover:shadow-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 ${
            variant === "outline"
              ? "bg-background hover:bg-muted"
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
          }`}
        >
          <Github className="mr-2 h-5 w-5" />
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-background overflow-hidden">
        <BackgroundGrid />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-6 lg:mb-8">
              Contact
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 lg:mb-12 max-w-3xl mx-auto">
              Turn Signal is open source. All support and contact is handled
              through GitHub issues.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <ContactCard
              icon={Bug}
              title="Report a Bug"
              description="Found a bug? Let us know so we can fix it quickly."
              buttonText="Create Bug Report"
              href="https://github.com/MikkelWestermann/turn-signal/issues/new?template=bug_report.md"
            />

            <ContactCard
              icon={MessageSquare}
              title="Get Support"
              description="Need help with Turn Signal? We're here to assist you."
              buttonText="Ask for Help"
              href="https://github.com/MikkelWestermann/turn-signal/issues/new?template=support.md"
            />

            <ContactCard
              icon={Lightbulb}
              title="Feature Request"
              description="Have an idea for a new feature? We'd love to hear it."
              buttonText="Suggest Feature"
              href="https://github.com/MikkelWestermann/turn-signal/issues/new?template=feature_request.md"
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6 lg:mb-8">
              Why GitHub Issues?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              As an open source project, we believe in transparency and
              community-driven development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-3 border-black dark:border-white shadow-lg flex items-center justify-center">
                  <Github className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    Transparent Communication
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 ml-16">
                All issues, discussions, and solutions are public. This means
                you can see what others are experiencing and benefit from
                community solutions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 border-3 border-black dark:border-white shadow-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    Community Support
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 ml-16">
                The open source community can help each other. You might get
                answers from other users who have faced similar issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-card border-4 border-black dark:border-white shadow-4xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                Ready to get in touch?
              </CardTitle>
              <CardDescription className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                Head over to GitHub and create an issue. We'll get back to you
                as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link
                href="https://github.com/MikkelWestermann/turn-signal/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-black dark:border-white shadow-3xl hover:shadow-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View All Issues
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
