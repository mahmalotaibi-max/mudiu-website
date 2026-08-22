import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/order/confirmation"],
    },
    sitemap: `${siteMeta.url}/sitemap.xml`,
  };
}
