import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://copynsync.com/alpha-testing",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
