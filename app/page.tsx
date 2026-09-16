import { Hero } from "@/components/marketing/Hero";
import { Problem } from "@/components/marketing/Problem";
import { DeskWorkIntro } from "@/components/marketing/DeskWorkIntro";
import { Ecosystem } from "@/components/marketing/Ecosystem";
import { Audience } from "@/components/marketing/Audience";
import { Differentiators } from "@/components/marketing/Differentiators";
import { Journeys } from "@/components/marketing/Journeys";
import { MarketingCta } from "@/components/marketing/Cta";

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