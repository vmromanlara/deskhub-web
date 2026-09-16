import type { Route } from "next";

export const navItems: ReadonlyArray<{ href: Route; label: string }> = [
  { href: "/", label: "Inicio" },
  { href: "/deskwork", label: "DeskWork" },
  { href: "/arquitectura", label: "Arquitectura" },
  { href: "/sectores", label: "Sectores" },
  { href: "/manifiesto", label: "Manifiesto" },
  { href: "/demo", label: "Demo" },
  { href: "/contacto", label: "Contacto" },
];