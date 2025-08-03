import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Turn Signal - Easy Public Roadmap Based on GitHub Issues",
    template: "%s | Turn Signal",
  },
  description:
    "Transform your GitHub issues into beautiful, public roadmaps that keep your users informed about what's coming next. Free, open source, and easy to use.",
  keywords: [
    "roadmap tool",
    "GitHub integration",
    "public roadmap",
    "product development",
    "feature requests",
    "user engagement",
    "open source",
  ],
  publisher: "Turn Signal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://turn-signal.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://turn-signal.co",
    siteName: "Turn Signal",
    title: "Turn Signal - Easy Public Roadmap Based on GitHub Issues",
    description:
      "Transform your GitHub issues into beautiful, public roadmaps that keep your users informed about what's coming next.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turn Signal - Easy Public Roadmap Based on GitHub Issues",
    description:
      "Transform your GitHub issues into beautiful, public roadmaps that keep your users informed about what's coming next.",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
