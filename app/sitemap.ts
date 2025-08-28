import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://turn-signal.co';

  return [
    {
      url: baseUrl,
    },
    {
      url: `${baseUrl}/about`,
    },
    {
      url: `${baseUrl}/pricing`,
    },
    {
      url: `${baseUrl}/contact`,
    },
    {
      url: `${baseUrl}/roadmaps`,
    },
    {
      url: `${baseUrl}/login`,
    },
  ];
}
