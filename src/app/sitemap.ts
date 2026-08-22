import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/site";
import { services } from "@/content/solutions";
import { products } from "@/content/products";
import { getAllArticles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/solutions",
    "/products",
    "/individuals",
    "/institutions",
    "/knowledge",
    "/contact",
  ].map((route) => ({
    url: `${siteMeta.url}${route}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${siteMeta.url}/solutions/${s.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteMeta.url}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getAllArticles().map((a) => ({
    url: `${siteMeta.url}/knowledge/${a.slug}`,
    lastModified: new Date(a.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes, ...articleRoutes];
}
