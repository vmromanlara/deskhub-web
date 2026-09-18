export const siteConfig = {
  name: "DeskHUB",
  product: "DeskWork",
  engine: "DeskFlow",
  tagline: "Enterprise Work Ecosystem",
  description:
    "DeskHUB es un ecosistema de soluciones para centralizar, integrar, monitorear y gestionar la operación, conectando personas, sistemas y datos.",
  url: "https://www.deskhub.cl",
  locale: "es-CL",
  contactEmail: "contacto@deskhub.cl",
} as const;

export type SiteConfig = typeof siteConfig;