export const siteConfig = {
  name: "DeskHUB",
  product: "DeskWork",
  engine: "DeskFlow",
  tagline: "Enterprise Work Ecosystem",
  description:
    "DeskHUB es el ecosistema DeskWork + DeskFlow que orquesta tus sistemas, integra tus operaciones y mantiene el contexto donde tu equipo realmente trabaja.",
  url: "https://deskhub.example.com",
  locale: "es-CL",
} as const;

export type SiteConfig = typeof siteConfig;