"use client";

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
  Users,
  Zap,
  Globe,
  TrendingUp,
  MessageSquare,
  Calendar,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { TurnSignal } from "@/components/turn-signal";

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
  <Card className="bg-card border-3 border-black dark:border-white shadow-2xl hover:shadow-lg hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div
          className={`w-12 h-12 ${bgColor} border-2 border-black dark:border-white shadow-sm flex items-center justify-center`}
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

// Features data
const features = [
  {
    icon: Github,
    title: "GitHub Integration",
    description:
      "Automatically sync your GitHub issues and pull requests. No manual updates needed.",
    bgColor: "bg-primary/20 dark:bg-primary/30",
  },
  {
    icon: Globe,
    title: "Public Roadmaps",
    description:
      "Beautiful, customizable roadmaps that your users can view and interact with.",
    bgColor: "bg-primary/20 dark:bg-primary/30",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description:
      "Your roadmap updates automatically as you work on GitHub. Always in sync.",
    bgColor: "bg-primary/20 dark:bg-primary/30",
  },
  {
    icon: Users,
    title: "User Engagement",
    description:
      "Let users vote and stay engaged with your product development.",
    bgColor: "bg-primary/20 dark:bg-primary/30",
  },
  {
    icon: MessageSquare,
    title: "Feedback Loop",
    description:
      "Build better products by understanding what your users want most.",
    bgColor: "bg-primary/20 dark:bg-primary/30",
  },
  {
    icon: TrendingUp,
    title: "Open Source",
    description:
      "Turn Signal is fully open source. View our code, contribute features, and help us build the future of roadmap management.",
    bgColor: "bg-primary/20 dark:bg-primary/30",
  },
];

import { BackgroundGrid } from "@/components/marketing/background-grid";

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
    className={`absolute animate-bounce hidden lg:block ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    {children}
  </div>
);

const AnimatedMessagingApp = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    {
      user: "When will dark mode be available?",
      agent: "We're working on it! Should be ready in 2-3 weeks.",
    },
    {
      user: "Can we get a mobile app?",
      agent: "That's planned for Q2 this year.",
    },
    {
      user: "The API needs rate limiting",
      agent: "Yes, we're adding that in the next update.",
    },
    {
      user: "User dashboard would be great",
      agent: "It's on our roadmap for next month.",
    },
    {
      user: "Export feature please!",
      agent: "We expect to have it ready in 2 weeks.",
    },
    {
      user: "Real-time notifications?",
      agent: "That's coming in our next release.",
    },
    {
      user: "Custom themes would be awesome",
      agent: "We're considering this for a future update.",
    },
    { user: "Bulk operations needed", agent: "This is planned for Q3." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-72 h-96 bg-white dark:bg-gray-800 border-3 border-black dark:border-white shadow-2xl flex flex-col">
      {/* WhatsApp Header */}
      <div className="bg-green-500 border-b-2 border-black dark:border-white px-3 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 border border-black dark:border-white shadow-xs"></div>
          <div className="w-3 h-3 bg-yellow-500 border border-black dark:border-white shadow-xs"></div>
          <div className="w-3 h-3 bg-green-500 border border-black dark:border-white shadow-xs"></div>
        </div>
        <div className="text-sm font-medium text-white">Support Chat</div>
        <div className="w-4"></div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div key={index}>
              {/* User Message */}
              <div className="flex justify-start mb-2">
                <div
                  className={`max-w-[200px] p-2 border-2 border-black dark:border-white shadow-sm transition-all duration-500 bg-white dark:bg-gray-800 ${
                    index === currentMessage ? "scale-105" : ""
                  }`}
                >
                  <div className="flex items-start space-x-1">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 border border-black dark:border-white shadow-xs rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-foreground">
                        {String.fromCharCode(65 + (index % 26))}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-xs font-bold text-foreground truncate">
                          User{index + 1}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {(Math.floor(index * 14) % 60) + 1}m
                        </span>
                      </div>
                      <p
                        className={`text-xs break-words ${
                          index === currentMessage
                            ? "text-foreground"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {message.user}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Response */}
              <div className="flex justify-end mb-2">
                <div
                  className={`max-w-[200px] p-2 border-2 border-black dark:border-white shadow-sm transition-all duration-500 bg-green-400 dark:bg-green-600 ${
                    index === currentMessage ? "scale-105" : ""
                  }`}
                >
                  <p
                    className={`text-xs break-words ${
                      index === currentMessage
                        ? "text-foreground"
                        : "text-foreground"
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
      <div className="p-2 bg-gray-200 dark:bg-gray-700 border-t-2 border-black dark:border-white flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-7 bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-sm px-2 flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Type a message...
            </span>
          </div>
          <div className="w-7 h-7 bg-green-500 border-2 border-black dark:border-white shadow-sm flex items-center justify-center">
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SimpleNotesApp = () => {
  const [currentNote, setCurrentNote] = useState(0);
  const notes = [
    "Dark mode support",
    "Mobile app",
    "API rate limiting",
    "User dashboard",
    "Export functionality",
    "Real-time notifications",
    "Custom themes",
    "Bulk operations",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNote((prev) => (prev + 1) % notes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [notes.length]);

  return (
    <div className="w-72 h-96 bg-white dark:bg-gray-800 border-3 border-black dark:border-white shadow-2xl">
      {/* Window Title Bar */}
      <div className="bg-gray-200 dark:bg-gray-700 border-b-2 border-black dark:border-white px-3 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 border border-black dark:border-white shadow-xs"></div>
          <div className="w-3 h-3 bg-yellow-500 border border-black dark:border-white shadow-xs"></div>
          <div className="w-3 h-3 bg-green-500 border border-black dark:border-white shadow-xs"></div>
        </div>
        <div className="text-sm font-medium text-foreground">Notes</div>
        <div className="w-4"></div>
      </div>

      {/* App Content */}
      <div className="p-4">
        <div className="mb-4">
          <h3 className="font-bold text-foreground text-lg">
            Feature Requests
          </h3>
        </div>

        <div className="space-y-2">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentNote
                  ? "text-foreground font-medium"
                  : "text-gray-500 dark:text-gray-400"
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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden">
        <BackgroundGrid />
        <FloatingElement delay={0} duration={3} className="top-20 left-20">
          <div className="w-16 h-16 bg-primary/20 dark:bg-primary/30 border-2 border-black dark:border-white shadow-lg flex items-center justify-center">
            <Github className="w-8 h-8 text-foreground" />
          </div>
        </FloatingElement>

        <FloatingElement delay={1} duration={4} className="top-32 right-32">
          <div className="w-12 h-12 bg-secondary/20 dark:bg-secondary/30 border-2 border-black dark:border-white shadow-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-foreground" />
          </div>
        </FloatingElement>

        <FloatingElement delay={2} duration={3.5} className="bottom-32 left-32">
          <div className="w-14 h-14 bg-accent/20 dark:bg-accent/30 border-2 border-black dark:border-white shadow-lg flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-foreground" />
          </div>
        </FloatingElement>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-16 lg:mb-24">
            <div className="flex items-center justify-center space-x-4 lg:space-x-8 mb-8">
              <TurnSignal direction="left" autoBlink blinkDelay={0} />
              <div className="text-center">
                <h1 className="text-5xl lg:text-8xl font-black tracking-wider text-foreground mb-2 lg:mb-4">
                  TURN
                </h1>
                <h2 className="text-5xl lg:text-8xl font-black tracking-wider text-primary -mt-2 lg:-mt-4">
                  SIGNAL
                </h2>
              </div>
              <TurnSignal direction="right" autoBlink blinkDelay={1000} />
            </div>

            <h3 className="text-2xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6 lg:mb-8 max-w-4xl mx-auto">
              Easy public roadmap based on GitHub issues
            </h3>

            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 lg:mb-12 max-w-3xl mx-auto">
              Transform your GitHub issues into beautiful, public roadmaps that
              keep your users informed about what's coming next.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 lg:h-16 px-8 lg:px-12 text-lg lg:text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-black dark:border-white shadow-2xl hover:shadow-lg hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                >
                  GET STARTED FREE
                  <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 lg:h-16 px-8 lg:px-12 text-lg lg:text-xl font-bold border-3 border-black dark:border-white bg-background hover:bg-muted shadow-3xl hover:shadow-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
                >
                  SEE HOW IT WORKS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6 lg:mb-8">
              Is it hard to keep track of what users want?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Feature requests scattered across notes, chats, and emails. It's
              time to centralize everything in one beautiful roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary border-black dark:border-white shadow-sm flex items-center justify-center">
                    <X className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    Scattered Requests
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Feature requests buried in support tickets, chat messages,
                    and random notes. Impossible to track what users actually
                    want.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary border-black dark:border-white shadow-sm flex items-center justify-center">
                    <X className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    No Prioritization
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Hard to know which features matter most to your users.
                    Building the wrong things because you can't see the big
                    picture.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary border-black dark:border-white shadow-sm flex items-center justify-center">
                    <X className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    Manual Updates
                  </h3>
                </CardHeader>
                <CardContent>
                  Constantly updating spreadsheets and documents. Time wasted on
                  maintenance instead of building features.
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col items-center space-y-16">
              <div className="relative">
                <SimpleNotesApp />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary border-black dark:border-white shadow-sm flex items-center justify-center animate-bounce">
                  <span className="text-xs font-bold text-black">!</span>
                </div>
              </div>
              <div className="relative">
                <AnimatedMessagingApp />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary border-black dark:border-white shadow-sm flex items-center justify-center animate-bounce">
                  <span className="text-xs font-bold text-black">!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative">
                <div className="relative overflow-hidden border-4 border-black dark:border-white shadow-4xl">
                  <img
                    src="/driver.png"
                    alt="First-person view from inside a car driving on a highway"
                    className="w-full h-auto animate-pulse-blur"
                    style={{
                      animation: "blur-unblur 4s ease-in-out infinite",
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
                <h2 className="text-3xl lg:text-5xl font-black text-foreground">
                  Stop Driving Blind
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                  Don't build features in the dark. See exactly what your users
                  want and build what they actually need.
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
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
                    className="h-12 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-black dark:border-white shadow-3xl hover:shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6 lg:mb-8">
              Avoid Sudden Changes
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Just like in driving, sudden changes in your product roadmap can
              lead to yelling, crying, and unkind gestures
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-16">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-200 dark:bg-red-800 border-2 border-black dark:border-white shadow-sm flex items-center justify-center"></div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    User Whiplash
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "Wait, I thought you were building the mobile app next month?"
                  "Why did you suddenly pivot to AI?" Your users need clear
                  signals, not surprises.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-200 dark:bg-yellow-800 border-2 border-black dark:border-white shadow-sm flex items-center justify-center"></div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    Builder Mentality
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Ever spent weeks building a feature, only to see it gather
                  dust? Without user input, it's easy to waste time on things
                  nobody wants. Turn Signal helps you focus on what matters so
                  you build features your users will actually use.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-200 dark:bg-green-800 border-2 border-black dark:border-white shadow-sm flex items-center justify-center"></div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    Smooth Transitions
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  With Turn Signal, you give your users clear visibility into
                  what's coming. No more sudden lane changes—just smooth,
                  predictable progress.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/drift.png"
                  alt="Famous drift meme showing a car in a dramatic drift with smoke"
                  className="w-full max-w-md border-4 border-black dark:border-white shadow-4xl"
                />
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
                Are you ready to show your users where you're going?
              </CardTitle>
              <CardDescription className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                Stop the endless "when will this be ready?" questions. Give your
                users visibility into your development roadmap.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 lg:h-16 px-8 lg:px-12 text-lg lg:text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-black dark:border-white shadow-2xl hover:shadow-lg hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                >
                  START BUILDING YOUR ROADMAP
                  <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-black text-center text-foreground mb-12 lg:mb-16">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-black text-center text-foreground mb-12 lg:mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary border-3 border-black dark:border-white shadow-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-black">1</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                Connect GitHub
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Link your GitHub repository and we'll automatically sync your
                issues and pull requests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-secondary border-3 border-black dark:border-white shadow-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-black">2</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                Organize & Customize
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your roadmap with custom categories, timelines, and
                statuses that match your workflow.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-secondary border-3 border-black dark:border-white shadow-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-black">3</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                Share & Engage
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your beautiful public roadmap with users and let them vote
                and stay engaged.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-card border-4 border-black dark:border-white shadow-4xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                Ready to turn your GitHub issues into a roadmap?
              </CardTitle>
              <CardDescription className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                Transform your GitHub issues into beautiful, shareable roadmaps
                that keep your users engaged and informed.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 lg:h-16 px-8 lg:px-12 text-lg lg:text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-black dark:border-white shadow-2xl hover:shadow-lg hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                >
                  START YOUR FREE ROADMAP
                  <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
