'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GitBranch,
  Map,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import Logo from './logo';

export function GitHubOnboarding() {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <Logo className="h-16 w-16" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to <span className="text-primary">Turn Signal</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Transform your GitHub issues into beautiful, public product roadmaps
            that your community can follow and contribute to.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg" className="shadow-lg">
            <Link href="/admin/organization/github">
              <GitBranch className="mr-2 h-5 w-5" />
              Connect GitHub
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-2 border-primary shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Map className="h-5 w-5 text-primary" />
            What is Turn Signal?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed">
            Turn Signal automatically creates public product roadmaps from your
            GitHub issues. It bridges the gap between your development workflow
            and community engagement, making your product development
            transparent and accessible to everyone.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-semibold">
                <Zap className="h-4 w-4 text-primary" />
                Automatic Sync
              </h3>
              <p className="text-sm text-muted-foreground">
                Your GitHub issues automatically sync to create beautiful,
                organized roadmaps. No manual work required.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-semibold">
                <Users className="h-4 w-4 text-primary" />
                Community Driven
              </h3>
              <p className="text-sm text-muted-foreground">
                Share your roadmap publicly and let your community see what's
                coming next. Build excitement and gather feedback.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-5 w-5 text-primary" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center bg-primary p-3 shadow-md">
                <span className="text-lg font-bold text-primary-foreground">
                  1
                </span>
              </div>
              <h3 className="text-sm font-semibold">Connect GitHub</h3>
              <p className="text-xs text-muted-foreground">
                Install our GitHub app and grant access to your repositories
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center bg-primary p-3 shadow-md">
                <span className="text-lg font-bold text-primary-foreground">
                  2
                </span>
              </div>
              <h3 className="text-sm font-semibold">Create Roadmap</h3>
              <p className="text-xs text-muted-foreground">
                Select repositories and configure your roadmap settings
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center bg-primary p-3 shadow-md">
                <span className="text-lg font-bold text-primary-foreground">
                  3
                </span>
              </div>
              <h3 className="text-sm font-semibold">Share & Engage</h3>
              <p className="text-xs text-muted-foreground">
                Share your public roadmap and engage with your community
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Why Turn Signal is Awesome</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <div>
                  <h4 className="text-sm font-semibold">Zero Configuration</h4>
                  <p className="text-xs text-muted-foreground">
                    Works with your existing GitHub workflow. No new tools to
                    learn.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <div>
                  <h4 className="text-sm font-semibold">Real-time Updates</h4>
                  <p className="text-xs text-muted-foreground">
                    Your roadmap automatically updates as you work on GitHub
                    issues.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <div>
                  <h4 className="text-sm font-semibold">Beautiful Design</h4>
                  <p className="text-xs text-muted-foreground">
                    Modern, responsive roadmaps that look great on any device.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <div>
                  <h4 className="text-sm font-semibold">
                    Community Engagement
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Let your users see what's coming and provide feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <div>
                  <h4 className="text-sm font-semibold">Customizable</h4>
                  <p className="text-xs text-muted-foreground">
                    Choose which issues to include and how to organize them.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <div>
                  <h4 className="text-sm font-semibold">Secure & Reliable</h4>
                  <p className="text-xs text-muted-foreground">
                    Built with security in mind and backed by GitHub's
                    infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Ready to Get Started?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base">
            It only takes a few minutes to set up your first roadmap. Connect
            your GitHub account and start sharing your product vision with the
            world!
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="shadow-lg">
              <Link href="/admin/organization/github">
                <GitBranch className="mr-2 h-5 w-5" />
                Connect GitHub Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="shadow-lg">
              <Link href="/admin/roadmaps/new">
                <Map className="mr-2 h-5 w-5" />
                Create Roadmap
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
