import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";

const footerCols = [
  {
    title: "Producto",
    links: [
      { href: "/deskwork" as const, label: "DeskWork" },
      { href: "/demo" as const, label: "Demo navegable" },
      { href: "/contacto" as const, label: "Solicitar demo" },
    ],
  },
  {
    title: "Ecosistema",
    links: [
      { href: "/" as const, label: "DeskHUB" },
      { href: "/deskwork" as const, label: "DeskFlow" },
      { href: "/deskwork" as const, label: "DeskCore" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { href: "/contacto" as const, label: "Contacto" },
      { href: "/contacto" as const, label: "Conversemos" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-secondary">
            {siteConfig.tagline}. {siteConfig.description}
          </p>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-4">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-secondary transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Reservados todos los derechos.
          </p>
          <p className="text-[12px] text-muted">
            {siteConfig.product} · {siteConfig.engine}
          </p>
        </Container>
      </div>
    </footer>
  );
}