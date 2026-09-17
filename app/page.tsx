import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Hero } from "@/components/marketing/Hero";
import { Problem } from "@/components/marketing/Problem";
import { DeskWorkIntro } from "@/components/marketing/DeskWorkIntro";
import { Ecosystem } from "@/components/marketing/Ecosystem";
import { Audience } from "@/components/marketing/Audience";
import { Differentiators } from "@/components/marketing/Differentiators";
import { Journeys } from "@/components/marketing/Journeys";
import { MarketingCta } from "@/components/marketing/Cta";

export const metadata: Metadata = buildMetadata({
  path: "/",
  title: siteConfig.tagline,
  description: siteConfig.description,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <DeskWorkIntro />
      <Ecosystem />
      <Journeys />
      <Audience />
      <Differentiators />
      <MarketingCta />
    </>
  );
}