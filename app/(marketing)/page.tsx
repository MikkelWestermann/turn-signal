'use client';

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
  Users,
  Zap,
  Globe,
  TrendingUp,
  MessageSquare,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { TurnSignal } from '@/components/turn-signal';
import { BackgroundGrid } from '@/components/marketing/background-grid';

// Feature card component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  bgColor,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
}) => (
  <Card className="border-3 border-black bg-card shadow-2xl transition-all duration-200 hover:shadow-lg dark:border-white">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div
          className={`h-12 w-12 ${bgColor} flex items-center justify-center border-2 border-black shadow-sm dark:border-white`}
        >
          <Icon className="h-6 w-6 text-foreground" />
        </div>
        <CardTitle className="text-xl font-bold text-foreground">
          {title}
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </CardContent>
  </Card>
);

// Step component for "How It Works" section
const StepCard = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border-3 border-black bg-secondary shadow-3xl dark:border-white">
      <span className="text-3xl font-black text-black">{number}</span>
    </div>
    <h3 className="mb-4 text-xl font-bold text-foreground lg:text-2xl">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

// Problem card component
const ProblemCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <Card>
    <CardHeader className="flex items-center space-x-3">
      <div className="flex h-8 w-8 items-center justify-center border-black bg-secondary shadow-sm dark:border-white">
        <Icon className="h-4 w-4 text-black" />
      </div>
      <h3 className="text-xl font-bold text-foreground lg:text-2xl">{title}</h3>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </CardContent>
  </Card>
);

// CTA card component
const CTACard = ({
  title,
  description,
  buttonText,
  href,
}: {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}) => (
  <Card className="mx-auto max-w-4xl border-4 border-black bg-card shadow-4xl dark:border-white">
    <CardHeader className="pb-6 text-center">
      <CardTitle className="mb-4 text-3xl font-black text-foreground lg:text-4xl">
        {title}
      </CardTitle>
      <CardDescription className="text-lg text-gray-600 lg:text-xl dark:text-gray-400">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent className="text-center">
      <Link href={href}>
        <Button
          size="lg"
          className="h-14 border-2 border-black bg-primary px-8 text-lg font-bold text-primary-foreground shadow-2xl transition-all duration-200 hover:bg-primary/90 lg:h-16 lg:px-12 lg:text-xl dark:border-white"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
        </Button>
      </Link>
    </CardContent>
  </Card>
);

// Floating element component - simplified to remove bounce animation
const FloatingElement = ({
  children,
  delay,
  duration,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  duration: number;
  className?: string;
}) => (
  <div
    className={`absolute hidden lg:block ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    {children}
  </div>
);

// Animated messaging app component
const AnimatedMessagingApp = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    {
      user: 'When will dark mode be available?',
      agent: "We're working on it! Should be ready in 2-3 weeks.",
    },
    {
      user: 'Can we get a mobile app?',
      agent: "That's planned for Q2 this year.",
    },
    {
      user: 'The API needs rate limiting',
      agent: "Yes, we're adding that in the next update.",
    },
    {
      user: 'User dashboard would be great',
      agent: "It's on our roadmap for next month.",
    },
    {
      user: 'Export feature please!',
      agent: 'We expect to have it ready in 2 weeks.',
    },
    {
      user: 'Real-time notifications?',
      agent: "That's coming in our next release.",
    },
    {
      user: 'Custom themes would be awesome',
      agent: "We're considering this for a future update.",
    },
    { user: 'Bulk operations needed', agent: 'This is planned for Q3.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex h-96 w-72 flex-col border-3 border-black bg-white shadow-2xl dark:border-white dark:bg-gray-800">
      {/* WhatsApp Header */}
      <div className="flex flex-shrink-0 items-center justify-between border-b-2 border-black bg-green-500 px-3 py-2 dark:border-white">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 border border-black bg-red-500 shadow-xs dark:border-white"></div>
          <div className="h-3 w-3 border border-black bg-yellow-500 shadow-xs dark:border-white"></div>
          <div className="h-3 w-3 border border-black bg-green-500 shadow-xs dark:border-white"></div>
        </div>
        <div className="text-sm font-medium text-white">Support Chat</div>
        <div className="w-4"></div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-3 dark:bg-gray-900">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div key={index}>
              {/* User Message */}
              <div className="mb-2 flex justify-start">
                <div
                  className={`max-w-[200px] border-2 border-black bg-white p-2 shadow-sm transition-opacity duration-200 dark:border-white dark:bg-gray-800 ${
                    index === currentMessage ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  <div className="flex items-start space-x-1">
                    <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-black bg-gray-300 shadow-xs dark:border-white dark:bg-gray-600">
                      <span className="text-xs font-bold text-foreground">
                        {String.fromCharCode(65 + (index % 26))}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center space-x-1">
                        <span className="truncate text-xs font-bold text-foreground">
                          User{index + 1}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {(Math.floor(index * 14) % 60) + 1}m
                        </span>
                      </div>
                      <p
                        className={`text-xs break-words ${
                          index === currentMessage
                            ? 'text-foreground'
                            : 'text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {message.user}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Response */}
              <div className="mb-2 flex justify-end">
                <div
                  className={`max-w-[200px] border-2 border-black bg-green-400 p-2 shadow-sm transition-opacity duration-200 dark:border-white dark:bg-green-600 ${
                    index === currentMessage ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  <p
                    className={`text-xs break-words ${
                      index === currentMessage
                        ? 'text-foreground'
                        : 'text-foreground'
                    }`}
                  >
                    {message.agent}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="flex flex-shrink-0 border-t-2 border-black bg-gray-200 p-2 dark:border-white dark:bg-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 flex-1 items-center border-2 border-black bg-white px-2 shadow-sm dark:border-white dark:bg-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Type a message...
            </span>
          </div>
          <div className="flex h-7 w-7 items-center justify-center border-2 border-black bg-green-500 shadow-sm dark:border-white">
            <ArrowRight className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple notes app component
const SimpleNotesApp = () => {
  const [currentNote, setCurrentNote] = useState(0);
  const notes = [
    'Dark mode support',
    'Mobile app',
    'API rate limiting',
    'User dashboard',
    'Export functionality',
    'Real-time notifications',
    'Custom themes',
    'Bulk operations',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNote((prev) => (prev + 1) % notes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [notes.length]);

  return (
    <div className="h-96 w-72 border-3 border-black bg-white shadow-2xl dark:border-white dark:bg-gray-800">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between border-b-2 border-black bg-gray-200 px-3 py-2 dark:border-white dark:bg-gray-700">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 border border-black bg-red-500 shadow-xs dark:border-white"></div>
          <div className="h-3 w-3 border border-black bg-yellow-500 shadow-xs dark:border-white"></div>
          <div className="h-3 w-3 border border-black bg-green-500 shadow-xs dark:border-white"></div>
        </div>
        <div className="text-sm font-medium text-foreground">Notes</div>
        <div className="w-4"></div>
      </div>

      {/* App Content */}
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground">
            Feature Requests
          </h3>
        </div>

        <div className="space-y-2">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`transition-opacity duration-200 ${
                index === currentNote
                  ? 'font-medium text-foreground'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Data arrays
const features = [
  {
    icon: Github,
    title: 'GitHub Integration',
    description:
      'Automatically sync your GitHub issues and pull requests. No manual updates needed.',
    bgColor: 'bg-primary/20 dark:bg-primary/30',
  },
  {
    icon: Globe,
    title: 'Public Roadmaps',
    description:
      'Beautiful, customizable roadmaps that your users can view and interact with.',
    bgColor: 'bg-primary/20 dark:bg-primary/30',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description:
      'Your roadmap updates automatically as you work on GitHub. Always in sync.',
    bgColor: 'bg-primary/20 dark:bg-primary/30',
  },
  {
    icon: Users,
    title: 'User Engagement',
    description:
      'Let users vote and stay engaged with your product development.',
    bgColor: 'bg-primary/20 dark:bg-primary/30',
  },
  {
    icon: MessageSquare,
    title: 'Feedback Loop',
    description:
      'Build better products by understanding what your users want most.',
    bgColor: 'bg-primary/20 dark:bg-primary/30',
  },
  {
    icon: TrendingUp,
    title: 'Open Source',
    description:
      'Turn Signal is fully open source. View our code, contribute features, and help us build the future of roadmap management.',
    bgColor: 'bg-primary/20 dark:bg-primary/30',
  },
];

const problems = [
  {
    icon: X,
    title: 'Scattered Requests',
    description:
      'Feature requests buried in support tickets, chat messages, and random notes. Impossible to track what users actually want.',
  },
  {
    icon: X,
    title: 'No Prioritization',
    description:
      "Hard to know which features matter most to your users. Building the wrong things because you can't see the big picture.",
  },
  {
    icon: X,
    title: 'Manual Updates',
    description:
      'Constantly updating spreadsheets and documents. Time wasted on maintenance instead of building features.',
  },
];

const steps = [
  {
    number: 1,
    title: 'Connect GitHub',
    description:
      "Link your GitHub repository and we'll automatically sync your issues and pull requests.",
  },
  {
    number: 2,
    title: 'Organize & Customize',
    description:
      'Organize your roadmap with custom categories, timelines, and statuses that match your workflow.',
  },
  {
    number: 3,
    title: 'Share & Engage',
    description:
      'Share your beautiful public roadmap with users and let them vote and stay engaged.',
  },
];

const floatingElements = [
  {
    icon: Github,
    delay: 0,
    duration: 3,
    className: 'top-20 left-20',
    size: 'w-16 h-16',
    iconSize: 'w-8 h-8',
    bgColor: 'bg-primary/20 dark:bg-primary/30',
  },
  {
    icon: Globe,
    delay: 1,
    duration: 4,
    className: 'top-32 right-32',
    size: 'w-12 h-12',
    iconSize: 'w-6 h-6',
    bgColor: 'bg-secondary/20 dark:bg-secondary/30',
  },
  {
    icon: TrendingUp,
    delay: 2,
    duration: 3.5,
    className: 'bottom-32 left-32',
    size: 'w-14 h-14',
    iconSize: 'w-7 h-7',
    bgColor: 'bg-accent/20 dark:bg-accent/30',
  },
];

const painPoints = [
  {
    title: 'User Whiplash',
    description:
      '"Wait, I thought you were building the mobile app next month?" "Why did you suddenly pivot to AI?" Your users need clear signals, not surprises.',
    bgColor: 'bg-red-200 dark:bg-red-800',
  },
  {
    title: 'Builder Mentality',
    description:
      "Ever spent weeks building a feature, only to see it gather dust? Without user input, it's easy to waste time on things nobody wants. Turn Signal helps you focus on what matters so you build features your users will actually use.",
    bgColor: 'bg-yellow-200 dark:bg-yellow-800',
  },
  {
    title: 'Smooth Transitions',
    description:
      "With Turn Signal, you give your users clear visibility into what's coming. No more sudden lane changes—just smooth, predictable progress.",
    bgColor: 'bg-green-200 dark:bg-green-800',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <BackgroundGrid />
        {floatingElements.map((element, index) => (
          <FloatingElement
            key={index}
            delay={element.delay}
            duration={element.duration}
            className={element.className}
          >
            <div
              className={`${element.size} ${element.bgColor} flex items-center justify-center border-2 border-black shadow-lg dark:border-white`}
            >
              <element.icon className={`${element.iconSize} text-foreground`} />
            </div>
          </FloatingElement>
        ))}

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mb-16 text-center lg:mb-24">
            <div className="mb-8 flex items-center justify-center space-x-4 lg:space-x-8">
              <TurnSignal direction="left" autoBlink blinkDelay={0} />
              <div className="text-center">
                <h1 className="mb-2 text-5xl font-black tracking-wider text-foreground lg:mb-4 lg:text-8xl">
                  <div>TURN</div>
                  <div>SIGNAL</div>
                </h1>
              </div>
              <TurnSignal direction="right" autoBlink blinkDelay={1000} />
            </div>

            <h3 className="mx-auto mb-6 max-w-4xl text-2xl font-bold text-gray-800 lg:mb-8 lg:text-4xl dark:text-gray-200">
              Easy public roadmap based on GitHub issues
            </h3>

            <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 lg:mb-12 lg:text-xl dark:text-gray-400">
              Transform your GitHub issues into beautiful, public roadmaps that
              keep your users informed about what's coming next.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:gap-6">
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 border-2 border-black bg-primary px-8 text-lg font-bold text-primary-foreground shadow-2xl transition-all duration-200 hover:bg-primary/90 lg:h-16 lg:px-12 lg:text-xl dark:border-white"
                >
                  GET STARTED FREE
                  <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 border-3 border-black bg-background px-8 text-lg font-bold shadow-3xl transition-all duration-200 hover:bg-muted lg:h-16 lg:px-12 lg:text-xl dark:border-white"
                >
                  SEE HOW IT WORKS
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center bg-orange-500 text-2xl text-white">
                Y
              </div>
              <div className="text-lg font-bold tracking-tighter text-orange-500">
                Continue waiting?
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-6 text-3xl font-black text-foreground lg:mb-8 lg:text-5xl">
              Is it hard to keep track of what users want?
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 lg:text-xl dark:text-gray-400">
              Feature requests scattered across notes, chats, and emails. It's
              time to centralize everything in one beautiful roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <ProblemCard
                  key={index}
                  icon={problem.icon}
                  title={problem.title}
                  description={problem.description}
                />
              ))}
            </div>

            <div className="flex flex-col items-center space-y-16">
              <div className="relative">
                <SimpleNotesApp />
                <div className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center border-black bg-secondary shadow-sm dark:border-white">
                  <span className="text-xs font-bold text-black">!</span>
                </div>
              </div>
              <div className="relative">
                <AnimatedMessagingApp />
                <div className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center border-black bg-secondary shadow-sm dark:border-white">
                  <span className="text-xs font-bold text-black">!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="relative">
                <div className="relative overflow-hidden border-4 border-black shadow-4xl dark:border-white">
                  <img
                    src="https://static.turn-signal.co/driver.png"
                    alt="First-person view from inside a car driving on a highway"
                    className="animate-pulse-blur h-auto w-full"
                    style={{
                      animation: 'blur-unblur 4s ease-in-out infinite',
                    }}
                  />
                </div>

                <style jsx>{`
                  @keyframes blur-unblur {
                    0%,
                    100% {
                      filter: blur(0px);
                      transform: scale(1);
                    }
                    25% {
                      filter: blur(3px);
                      transform: scale(1.02);
                    }
                    50% {
                      filter: blur(6px);
                      transform: scale(1.05);
                    }
                    75% {
                      filter: blur(3px);
                      transform: scale(1.02);
                    }
                  }
                `}</style>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-foreground lg:text-5xl">
                  Stop Driving Blind
                </h2>
                <p className="text-lg text-gray-600 lg:text-xl dark:text-gray-400">
                  Don't build features in the dark. See exactly what your users
                  want and build what they actually need.
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  Let users vote on features so you know exactly what they're
                  asking for, not just guessing. Prioritize based on real demand
                  and stop building things nobody asked for. The result?
                  Features users actually want, higher adoption, and real
                  impact.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="h-12 border-2 border-black bg-primary px-8 text-lg font-bold text-primary-foreground shadow-3xl transition-all duration-200 hover:bg-primary/90 dark:border-white"
                  >
                    Start Building Smarter
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-6 text-3xl font-black text-foreground lg:mb-8 lg:text-5xl">
              Avoid Sudden Changes
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 lg:text-xl dark:text-gray-400">
              Just like in driving, sudden changes in your product roadmap can
              lead to yelling, crying, and unkind gestures
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 lg:space-y-16">
              {painPoints.map((point, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-8 w-8 ${point.bgColor} flex items-center justify-center border-2 border-black shadow-sm dark:border-white`}
                    ></div>
                    <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="https://static.turn-signal.co/drift.png"
                  alt="Famous drift meme showing a car in a dramatic drift with smoke"
                  className="w-full max-w-md border-4 border-black shadow-4xl dark:border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTACard
            title="Are you ready to show your users where you're going?"
            description="Stop the endless 'when will this be ready?' questions. Give your users visibility into your development roadmap."
            buttonText="START BUILDING YOUR ROADMAP"
            href="/login"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-black text-foreground lg:mb-16 lg:text-5xl">
            Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                bgColor={feature.bgColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-black text-foreground lg:mb-16 lg:text-5xl">
            How It Works
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTACard
            title="Ready to turn your GitHub issues into a roadmap?"
            description="Transform your GitHub issues into beautiful, shareable roadmaps that keep your users engaged and informed."
            buttonText="START YOUR FREE ROADMAP"
            href="/login"
          />
        </div>
      </section>
    </div>
  );
}
