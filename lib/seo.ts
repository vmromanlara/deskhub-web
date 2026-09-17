// DeskHUB — SEO / Metadata helper
// Generates full Next.js Metadata (canonical, Open Graph, Twitter, robots)
// from a per-page spec. Centralises the production domain so no page can
// drift back to a placeholder.
//
// Usage:
//   export const metadata = buildMetadata({
//     path: "/deskwork",
//     title: "DeskWork",
//     description: "...",
//   });
//
// IMPORTANT: `title` should be the SHORT page name (e.g. "DeskWork").
// The layout's `title.template` adds the " — DeskHUB" suffix automatically,
// and `title.default` handles the home page. Returning the already-suffixed
// title from this helper would duplicate the brand.

import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export type SeoSpec = {
  /** Page path starting with "/". Use "/" for the home page. */
  path: `/${string}` | "/";
  /** Short page title (e.g. "DeskWork"). Suffix is added by the layout template. */
  title: string;
  /** Description used for both <meta name="description"> and og:description. */
  description: string;
  /** Optional override for og:title / twitter:title. Defaults to `title`. */
  ogTitle?: string;
  /**
   * Optional override for og:image URL. Defaults to the site-wide OG image
   * (siteConfig.url + "/og-image.svg"). Must be an absolute URL.
   */
  ogImage?: string;
  /** Optional override for og:type. Defaults to "website". */
  ogType?: "website" | "article";
  /** Set true to prevent indexing (not used by any current public page). */
  noindex?: boolean;
};

const DEFAULT_OG_IMAGE_PATH = "/og-image.svg";

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = siteConfig.url.replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export function buildMetadata(spec: SeoSpec): Metadata {
  const canonical = absoluteUrl(spec.path);
  const ogTitle = spec.ogTitle ?? spec.title;
  const ogImage = absoluteUrl(spec.ogImage ?? DEFAULT_OG_IMAGE_PATH);

  // Home page uses an absolute title so the layout's `title.template`
  // doesn't prepend " — DeskHUB". Every other page relies on the template.
  const titleField: Metadata["title"] =
    spec.path === "/"
      ? { absolute: `${siteConfig.name} — ${siteConfig.tagline}` }
      : spec.title;

  return {
    title: titleField,
    description: spec.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: spec.ogType ?? "website",
      siteName: siteConfig.name,
      title: ogTitle,
      description: spec.description,
      url: canonical,
      locale: siteConfig.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${spec.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: spec.description,
      images: [ogImage],
    },
    robots: spec.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

