import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Public routes that should appear in the sitemap. /demo is included
// because it is part of the public funnel (linked from navigation
// and from commercial pages) and is indexable.
const PUBLIC_ROUTES = [
  "/",
  "/deskwork",
  "/arquitectura",
  "/sectores",
  "/manifiesto",
  "/demo",
  "/contacto",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // Static, deterministic sitemap entries. We deliberately omit
  // `lastModified` to avoid a churn signal to crawlers — no per-page
  // modification timestamp is tracked yet.
  return PUBLIC_ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
