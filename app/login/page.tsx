'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/auth/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, Zap, Car } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import Logo from '@/components/logo';
import { TurnSignal } from '@/components/turn-signal';

const BackgroundGrid = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-muted/10 to-muted/20 opacity-30" />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
    <div
      className="absolute inset-0 hidden dark:block"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
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
    className="absolute hidden animate-bounce sm:block"
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    {children}
  </div>
);

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const { data: session, isPending } = authClient.useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // TODO: do this server side
  useEffect(() => {
    if (session?.user && !isPending) {
      router.push(redirectTo || '/admin');
    }
  }, [session, isPending, router, redirectTo]);

  const handleGitHubSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);

    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: redirectTo || '/admin',
        errorCallbackURL: '/login',
        newUserCallbackURL: redirectTo || '/admin',
      });
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      setAuthError('Failed to sign in with GitHub. Please try again.');
      setIsSigningIn(false);
    }
  };

  if (isPending) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
        <BackgroundGrid />
        <div className="relative z-10 flex items-center space-x-4 border-2 border-black bg-card px-6 py-4 shadow-lg sm:px-8 sm:py-6 dark:border-white">
          <Loader2 className="h-6 w-6 animate-spin text-primary sm:h-8 sm:w-8" />
          <span className="text-lg font-bold tracking-wider text-black sm:text-xl dark:text-white">
            LOADING...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <BackgroundGrid />

      <div className="absolute top-4 left-4 z-20 sm:top-8 sm:left-8">
        <Logo className="h-10 w-10 sm:h-12 sm:w-12" />
      </div>

      <div className="absolute top-4 right-4 z-20 sm:top-8 sm:right-8">
        <ModeToggle />
      </div>

      <FloatingElement delay={0} duration={3}>
        <div className="top-20 left-20 flex h-16 w-16 items-center justify-center border-2 border-black bg-primary/20 shadow-lg dark:border-white dark:bg-primary/30">
          <Zap className="h-8 w-8 text-black dark:text-white" />
        </div>
      </FloatingElement>

      <FloatingElement delay={1} duration={4}>
        <div className="top-32 right-32 flex h-12 w-12 items-center justify-center border-2 border-black bg-secondary/20 shadow-lg dark:border-white dark:bg-secondary/30">
          <Car className="h-6 w-6 text-black dark:text-white" />
        </div>
      </FloatingElement>

      <div className="relative z-10 w-full max-w-sm sm:max-w-lg">
        <Card className="border-4 border-black bg-card shadow-lg dark:border-white">
          <CardHeader className="pb-6 text-center sm:pb-8">
            <div className="mb-4 flex items-center justify-center space-x-4 sm:mb-6 sm:space-x-8">
              <TurnSignal direction="left" autoBlink={true} blinkDelay={0} />
              <div className="text-center">
                <h1 className="mb-1 text-4xl font-black tracking-wider text-black sm:mb-2 sm:text-6xl dark:text-white">
                  TURN
                </h1>
                <h2 className="-mt-1 text-4xl font-black tracking-wider text-primary sm:-mt-2 sm:text-6xl">
                  SIGNAL
                </h2>
              </div>
              <TurnSignal
                direction="right"
                autoBlink={true}
                blinkDelay={1000}
              />
            </div>

            <CardDescription className="px-4 text-lg font-semibold text-gray-700 sm:px-8 sm:text-xl dark:text-gray-300">
              Ready to let your users know where you're going?
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 px-4 sm:space-y-6 sm:px-6">
            {authError && (
              <Alert
                className="border-2 border-red-500 bg-red-50 shadow-lg dark:border-red-400 dark:bg-red-950"
                variant="destructive"
              >
                <AlertDescription className="text-sm font-semibold text-red-900 sm:text-base dark:text-red-100">
                  {authError}
                </AlertDescription>
              </Alert>
            )}

            <Button
              variant="outline"
              className="h-12 w-full border-3 border-black bg-background text-base font-bold text-black shadow-lg transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-muted sm:h-14 sm:text-lg dark:border-white dark:text-white"
              onClick={handleGitHubSignIn}
              disabled={isSigningIn}
            >
              {isSigningIn && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin sm:mr-3 sm:h-5 sm:w-5" />
              )}
              <svg
                className="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5"
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

            <div className="mt-6 text-center sm:mt-8">
              <Link
                href="/"
                className="inline-flex items-center border-2 border-primary bg-background px-4 py-2 text-base font-bold text-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:text-primary/80 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] sm:px-6 sm:py-3 sm:text-lg dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
              >
                <ArrowLeft className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">BACK TO HOME</span>
                <span className="sm:hidden">HOME</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
