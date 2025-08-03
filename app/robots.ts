import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const authUrl = process.env.BETTER_AUTH_URL;
  const isProduction = authUrl === "https://turn-signal.co";

  if (isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin/", "/api/", "/login"],
        },
      ],
      sitemap: "https://turn-signal.co/sitemap.xml",
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    sitemap: "https://turn-signal.co/sitemap.xml",
  };
}
