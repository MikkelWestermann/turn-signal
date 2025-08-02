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
} from "lucide-react";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

const TurnSignal = ({
  direction,
  isBlinking,
}: {
  direction: "left" | "right";
  isBlinking: boolean;
}) => (
  <div className={`relative ${direction === "left" ? "rotate-180" : ""}`}>
    <div
      className={`w-6 h-3 sm:w-8 sm:h-4 bg-amber-300 dark:bg-amber-400 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${
        isBlinking ? "animate-pulse" : "opacity-30"
      }`}
    />
    <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black dark:bg-white" />
    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black dark:bg-white" />
    <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black dark:bg-white" />
    <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black dark:bg-white" />
  </div>
);

const BackgroundGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 opacity-15" />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
    <div
      className="absolute inset-0 dark:block hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  </div>
);

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      <BackgroundGrid />
      <FloatingElement delay={0} duration={3} className="top-20 left-20">
        <div className="w-16 h-16 bg-orange-200 dark:bg-orange-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
          <Github className="w-8 h-8 text-black dark:text-white" />
        </div>
      </FloatingElement>

      <FloatingElement delay={1} duration={4} className="top-32 right-32">
        <div className="w-12 h-12 bg-amber-200 dark:bg-amber-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
          <Globe className="w-6 h-6 text-black dark:text-white" />
        </div>
      </FloatingElement>

      <FloatingElement delay={2} duration={3.5} className="bottom-32 left-32">
        <div className="w-14 h-14 bg-red-200 dark:bg-red-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
          <TrendingUp className="w-7 h-7 text-black dark:text-white" />
        </div>
      </FloatingElement>

      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16 lg:mb-24">
          <div className="flex items-center justify-center space-x-4 lg:space-x-8 mb-8">
            <TurnSignal direction="left" isBlinking={false} />
            <div className="text-center">
              <h1 className="text-5xl lg:text-8xl font-black tracking-wider text-black dark:text-white mb-2 lg:mb-4">
                TURN
              </h1>
              <h2 className="text-5xl lg:text-8xl font-black tracking-wider text-orange-600 dark:text-orange-400 -mt-2 lg:-mt-4">
                SIGNAL
              </h2>
            </div>
            <TurnSignal direction="right" isBlinking={false} />
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
                className="h-14 lg:h-16 px-8 lg:px-12 text-lg lg:text-xl font-bold bg-orange-600 hover:bg-orange-700 text-white border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                GET STARTED FREE
                <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="h-14 lg:h-16 px-8 lg:px-12 text-lg lg:text-xl font-bold border-3 border-black dark:border-white bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-orange-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
              >
                SEE HOW IT WORKS
              </Button>
            </Link>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto mb-16 lg:mb-24 bg-white dark:bg-gray-900 border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl lg:text-4xl font-black text-black dark:text-white mb-4">
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
                className="h-14 lg:h-16 px-8 lg:px-12 text-lg lg:text-xl font-bold bg-orange-600 hover:bg-orange-700 text-white border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                START BUILDING YOUR ROADMAP
                <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 lg:mb-24">
          <Card className="bg-white dark:bg-gray-900 border-3 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-200 dark:bg-orange-800 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
                  <Github className="h-6 w-6 text-black dark:text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-black dark:text-white">
                  GitHub Integration
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Automatically sync your GitHub issues and pull requests. No
                manual updates needed.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-3 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-amber-200 dark:bg-amber-800 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
                  <Globe className="h-6 w-6 text-black dark:text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-black dark:text-white">
                  Public Roadmaps
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful, customizable roadmaps that your users can view and
                interact with.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-3 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-200 dark:bg-red-800 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
                  <Zap className="h-6 w-6 text-black dark:text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-black dark:text-white">
                  Real-time Updates
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Your roadmap updates automatically as you work on GitHub. Always
                in sync.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-3 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-200 dark:bg-green-800 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
                  <Users className="h-6 w-6 text-black dark:text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-black dark:text-white">
                  User Engagement
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Let users vote, comment, and stay engaged with your product
                development.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-3 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-200 dark:bg-purple-800 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-black dark:text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-black dark:text-white">
                  Feedback Loop
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Build better products by understanding what your users want
                most.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-3 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-black dark:text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-black dark:text-white">
                  Timeline Views
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Organize features by timeline, status, or custom categories that
                make sense for your team.
              </p>
            </CardContent>
          </Card>
        </div>

        <div id="how-it-works" className="mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-black text-center text-black dark:text-white mb-12 lg:mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-200 dark:bg-orange-800 border-3 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-black dark:text-white">
                  1
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-black dark:text-white mb-4">
                Connect GitHub
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Link your GitHub repository and we'll automatically sync your
                issues and pull requests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-200 dark:bg-amber-800 border-3 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-black dark:text-white">
                  2
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-black dark:text-white mb-4">
                Organize & Customize
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your roadmap with custom categories, timelines, and
                statuses that match your workflow.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-200 dark:bg-red-800 border-3 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-black dark:text-white">
                  3
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-black dark:text-white mb-4">
                Share & Engage
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your beautiful public roadmap with users and let them
                vote, comment, and stay engaged.
              </p>
            </div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl lg:text-4xl font-black text-black dark:text-white mb-4">
              Ready to turn your GitHub issues into a roadmap?
            </CardTitle>
            <CardDescription className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
              Join thousands of developers who are already building better
              products with Turn Signal.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/login">
              <Button
                size="lg"
                className="h-14 lg:h-16 px-8 lg:px-12 text-lg lg:text-xl font-bold bg-orange-600 hover:bg-orange-700 text-white border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                START YOUR FREE ROADMAP
                <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
