import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  Github,
  MessageSquare,
  Bug,
  Lightbulb,
} from 'lucide-react';

import { BackgroundGrid } from '@/components/marketing/background-grid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Turn Signal Support',
  description:
    'Get support for Turn Signal through GitHub issues. Report bugs, ask for help, or suggest new features. All communication is transparent and community-driven.',
  keywords: [
    'support',
    'contact',
    'bug report',
    'feature request',
    'GitHub issues',
    'open source support',
  ],
  openGraph: {
    title: 'Contact - Turn Signal Support',
    description:
      'Get support for Turn Signal through GitHub issues. Report bugs, ask for help, or suggest new features.',
    type: 'website',
    url: 'https://turn-signal.co/contact',
    siteName: 'Turn Signal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Turn Signal Support',
    description:
      'Get support for Turn Signal through GitHub issues. Report bugs, ask for help, or suggest new features.',
  },
};

const ContactCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  href,
  variant = 'default',
}: {
  icon: any;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  variant?: 'default' | 'outline';
}) => (
  <Card className="border-4 border-black bg-card shadow-4xl dark:border-white">
    <CardHeader className="pb-6 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border-3 border-black bg-primary/20 shadow-3xl dark:border-white dark:bg-primary/30">
        <Icon className="h-8 w-8 text-foreground" />
      </div>
      <CardTitle className="mb-4 text-2xl font-black text-foreground lg:text-3xl">
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
          className={`h-14 border-2 border-black px-8 text-lg font-bold shadow-3xl transition-all duration-200 hover:shadow-lg dark:border-white ${
            variant === 'outline'
              ? 'bg-background hover:bg-muted'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
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
      <section className="relative overflow-hidden bg-background">
        <BackgroundGrid />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mb-16 text-center lg:mb-24">
            <h1 className="mb-6 text-4xl font-black text-foreground lg:mb-8 lg:text-6xl">
              Contact
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 lg:mb-12 lg:text-2xl dark:text-gray-400">
              Turn Signal is open source. All support and contact is handled
              through GitHub issues.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
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
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-6 text-3xl font-black text-foreground lg:mb-8 lg:text-5xl">
              Why GitHub Issues?
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 lg:text-xl dark:text-gray-400">
              As an open source project, we believe in transparency and
              community-driven development.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center border-3 border-black bg-primary/20 shadow-lg dark:border-white dark:bg-primary/30">
                  <Github className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                    Transparent Communication
                  </h3>
                </div>
              </div>
              <p className="ml-16 text-gray-600 dark:text-gray-400">
                All issues, discussions, and solutions are public. This means
                you can see what others are experiencing and benefit from
                community solutions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center border-3 border-black bg-primary/20 shadow-lg dark:border-white dark:bg-primary/30">
                  <MessageSquare className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                    Community Support
                  </h3>
                </div>
              </div>
              <p className="ml-16 text-gray-600 dark:text-gray-400">
                The open source community can help each other. You might get
                answers from other users who have faced similar issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="mx-auto max-w-4xl border-4 border-black bg-card shadow-4xl dark:border-white">
            <CardHeader className="pb-6 text-center">
              <CardTitle className="mb-4 text-3xl font-black text-foreground lg:text-4xl">
                Ready to get in touch?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 lg:text-xl dark:text-gray-400">
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
                  className="h-14 border-2 border-black bg-primary px-8 text-lg font-bold text-primary-foreground shadow-3xl transition-all duration-200 hover:bg-primary/90 dark:border-white"
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
