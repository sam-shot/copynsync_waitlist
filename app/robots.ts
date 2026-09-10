import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/alpha-testing"],
    },
    sitemap: "https://copynsync.com/sitemap.xml",
  };
}
