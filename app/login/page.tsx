"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Zap, Car } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import Logo from "@/components/logo";

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
}: {
  children: React.ReactNode;
  delay: number;
  duration: number;
}) => (
  <div
    className="absolute animate-bounce hidden sm:block"
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    {children}
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [leftBlinking, setLeftBlinking] = useState(false);
  const [rightBlinking, setRightBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftBlinking(true);
      setTimeout(() => setLeftBlinking(false), 500);
      setTimeout(() => {
        setRightBlinking(true);
        setTimeout(() => setRightBlinking(false), 500);
      }, 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // TODO: do this server side
  useEffect(() => {
    if (session?.user && !isPending) {
      router.push("/admin");
    }
  }, [session, isPending, router]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/admin",
        errorCallbackURL: "/login",
        newUserCallbackURL: "/admin",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setAuthError("Failed to sign in with Google. Please try again.");
      setIsSigningIn(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);

    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/admin",
        errorCallbackURL: "/login",
        newUserCallbackURL: "/admin",
      });
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      setAuthError("Failed to sign in with GitHub. Please try again.");
      setIsSigningIn(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden px-4">
        <BackgroundGrid />
        <div className="relative z-10 flex items-center space-x-4 bg-white dark:bg-gray-900 border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] px-6 py-4 sm:px-8 sm:py-6">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-orange-500" />
          <span className="text-lg sm:text-xl font-bold tracking-wider text-black dark:text-white">
            LOADING...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden px-4">
      <BackgroundGrid />

      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
        <Logo className="w-10 h-10 sm:w-12 sm:h-12" />
      </div>

      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20">
        <ModeToggle />
      </div>

      <FloatingElement delay={0} duration={3}>
        <div className="top-20 left-20 w-16 h-16 bg-orange-200 dark:bg-orange-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
          <Zap className="w-8 h-8 text-black dark:text-white" />
        </div>
      </FloatingElement>

      <FloatingElement delay={1} duration={4}>
        <div className="top-32 right-32 w-12 h-12 bg-amber-200 dark:bg-amber-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
          <Car className="w-6 h-6 text-black dark:text-white" />
        </div>
      </FloatingElement>

      <div className="relative z-10 w-full max-w-sm sm:max-w-lg">
        <Card className="bg-white dark:bg-gray-900 border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
          <CardHeader className="text-center pb-6 sm:pb-8">
            <div className="flex items-center justify-center space-x-4 sm:space-x-8 mb-4 sm:mb-6">
              <TurnSignal direction="left" isBlinking={leftBlinking} />
              <div className="text-center">
                <h1
                  className="text-4xl sm:text-6xl font-black tracking-wider text-black dark:text-white mb-1 sm:mb-2"
                  style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}
                >
                  TURN
                </h1>
                <h2
                  className="text-4xl sm:text-6xl font-black tracking-wider text-orange-600 dark:text-orange-400 -mt-1 sm:-mt-2"
                  style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}
                >
                  SIGNAL
                </h2>
              </div>
              <TurnSignal direction="right" isBlinking={rightBlinking} />
            </div>

            <CardDescription className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 px-4 sm:px-8">
              Ready to let your users know where you're going?
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            {authError && (
              <Alert
                className="border-2 border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(248,113,113,0.3)]"
                variant="destructive"
              >
                <AlertDescription className="font-semibold text-red-900 dark:text-red-100 text-sm sm:text-base">
                  {authError}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3 sm:space-y-4">
              <Button
                variant="outline"
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold border-3 border-black dark:border-white bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-orange-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 text-black dark:text-white"
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
              >
                {isSigningIn && (
                  <Loader2 className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                )}
                <svg
                  className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="hidden sm:inline">CONTINUE WITH GOOGLE</span>
                <span className="sm:hidden">GOOGLE</span>
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold border-3 border-black dark:border-white bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-orange-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 text-black dark:text-white"
                onClick={handleGitHubSignIn}
                disabled={isSigningIn}
              >
                {isSigningIn && (
                  <Loader2 className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                )}
                <svg
                  className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                <span className="hidden sm:inline">CONTINUE WITH GITHUB</span>
                <span className="sm:hidden">GITHUB</span>
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 bg-white dark:bg-gray-900 border-2 border-orange-600 dark:border-orange-400 px-4 sm:px-6 py-2 sm:py-3 shadow-[4px_4px_0px_0px_rgba(234,88,12,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(251,146,60,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(234,88,12,0.3)] dark:hover:shadow-[2px_2px_0px_0px_rgba(251,146,60,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
              >
                <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">BACK TO HOME</span>
                <span className="sm:hidden">HOME</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-8 left-8 hidden sm:flex space-x-4">
        <div className="w-8 h-8 bg-orange-300 dark:bg-orange-700 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" />
        <div className="w-8 h-8 bg-amber-300 dark:bg-amber-700 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" />
        <div className="w-8 h-8 bg-red-300 dark:bg-red-700 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" />
      </div>

      <div className="absolute bottom-8 right-8 hidden sm:flex space-x-4">
        <div className="w-8 h-8 bg-red-300 dark:bg-red-700 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" />
        <div className="w-8 h-8 bg-amber-300 dark:bg-amber-700 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" />
        <div className="w-8 h-8 bg-orange-300 dark:bg-orange-700 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" />
      </div>
    </div>
  );
}
