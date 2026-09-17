import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/marketing/ArchitectureDiagram";
import { principles } from "@/components/marketing/dwPrinciples";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  path: "/arquitectura",
  title: "Arquitectura",
  description: "Cómo está construido DeskHUB: capas, principios DW-01..DW-10, decisiones técnicas que protegen la constitución del producto.",
});
const stackLayers = [
  {
    name: "DeskWork",
    role: "Producto — Workspaces, UI, experiencia del equipo.",
    color: "bg-primary-700 text-primary-200",
  },
  {
    name: "DeskFlow",
    role: "Motor de workflow. Durable, idempotente, auditado.",
    color: "bg-primary-200 text-primary-800",
  },
  {
    name: "Desk Integration",
    role: "Conectores · APIs · Webhooks · Credential vault · n8n adapter.",
    color: "bg-canvas text-ink border border-line",
  },
  {
    name: "DeskCore",
    role: "Identidad · Multi-tenant · RLS · Servicios comunes · Audit base.",
    color: "bg-canvas text-ink border border-line",
  },
];

export default function ArquitecturaPage() {
  return (
    <>
      <section className="border-b border-line bg-canvas">
        <Container className="py-20 md:py-28">
          <Reveal>
            <p className="eyebrow mb-4">Arquitectura</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-tight text-ink md:text-[52px]">
              Una constitución técnica,
              <br />
              <span className="text-primary-700">no una lista de buzzwords.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-secondary md:text-[18px]">
              Cada decisión de DeskHUB se valida contra los principios
              DW-01..DW-10. Aquí están las capas, los principios y las
              decisiones que hacen que el ecosistema funcione como un
              ecosistema, no como una plataforma más.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-surface">
        <Container className="py-24">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow">Stack por capas</p>
              <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
                DeskCore sostiene. Desk Integration conecta. DeskFlow coordina.
                DeskWork presenta.
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <ArchitectureDiagram />
          </Reveal>

          <Reveal>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {stackLayers.map((l, i) => (
                <div
                  key={l.name}
                  className={`rounded-md p-5 ${l.color}`}
                  style={{ marginLeft: `${i * 12}px` }}
                >
                  <p className="eyebrow mb-1 opacity-70">Capa {i + 1}</p>
                  <p className="text-[16px] font-semibold">{l.name}</p>
                  <p className="mt-1 text-[13px] opacity-80">{l.role}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-3xl rounded-md border border-dashed border-line bg-canvas p-5 text-[13px] text-secondary">
              <strong className="font-semibold text-ink">Sistemas externos:</strong>{" "}
              ERP, CRM, correo, calendar, archivos, identidad, observabilidad.
              DeskHUB orquesta; cada sistema conserva su autoridad sobre su
              dato.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-canvas">
        <Container className="py-24">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="eyebrow">Constitución DW-01..DW-10</p>
              <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
                Diez principios que cualquier propuesta nueva debe validar.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-secondary">
                Estos principios son la constitución técnica del ecosistema.
                Antes de aprobar una ADR, una migración, una nueva dependencia
                o un cambio de API, cada propuesta se valida contra esta
                lista.
              </p>
            </div>
          </Reveal>

          <ol className="grid gap-4">
            {principles.map((p, i) => (
              <Reveal key={p.id} delay={i * 40}>
                <li className="rounded-lg border border-line bg-surface p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                    <span className="inline-flex h-10 w-16 shrink-0 items-center justify-center rounded-md bg-primary-700 font-mono text-[14px] font-semibold text-primary-200">
                      {p.id}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-[18px] font-semibold tracking-tight text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-secondary">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-24">
          <Reveal>
            <div className="rounded-lg border border-line bg-canvas p-10 text-center">
              <p className="eyebrow mb-3">Cómo se ve esto en el producto</p>
              <h2 className="mx-auto max-w-2xl text-[26px] font-semibold tracking-tight md:text-[34px]">
                Recorre DeskWork antes de leer más.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-secondary">
                Las decisiones arquitectónicas no son abstractas. La demo las
                hace visibles: workspaces, timer, auditoría, SLA.
              </p>
              <Link
                href="/demo"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-700 px-5 text-[15px] font-medium text-primary-200 transition-colors hover:bg-primary-800"
              >
                Abrir la demo
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}