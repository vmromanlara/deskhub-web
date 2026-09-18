import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { LayoutDashboard, ShieldCheck, GitBranch } from "lucide-react";

export function DeskWorkIntro() {
  return (
    <section className="border-b border-line bg-canvas">
      <Container className="grid gap-12 py-24 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <p className="eyebrow">El producto</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
            <span className="text-primary-700">DeskWork</span> es donde tu equipo
            realmente trabaja.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-secondary">
            DeskWork es la plataforma que presenta el trabajo: tickets, proyectos,
            aprobaciones, conocimiento y comunicación agrupados por contexto, no
            por aplicación. Detrás, conecta y coordina integraciones con tus
            sistemas. Encima, mantiene a tu equipo enfocado en lo que importa.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/deskwork"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary-700 px-5 text-[14px] font-medium text-primary-200 hover:bg-primary-800"
            >
              Ver DeskWork
            </Link>
            <Link
              href="/demo"
              className="inline-flex h-11 items-center justify-center rounded-md border border-line bg-surface px-5 text-[14px] font-medium text-ink hover:border-ink/20"
            >
              Probar la demo
            </Link>
          </div>
        </div>

        <ul className="grid gap-4">
          <li className="flex gap-4 rounded-lg border border-line bg-surface p-5">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-700 text-primary-200">
              <LayoutDashboard size={18} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-ink">
                Workspaces con contexto
              </h3>
              <p className="mt-1 text-[14px] leading-relaxed text-secondary">
                Cada equipo ve su trabajo ordenado por dominios, no por silos
                técnicos.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-lg border border-line bg-surface p-5">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-700 text-primary-200">
              <GitBranch size={18} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-ink">
                Workflow durable
              </h3>
              <p className="mt-1 text-[14px] leading-relaxed text-secondary">
                DeskFlow ejecuta procesos de varios pasos, con reintentos
                idempotentes y trazabilidad.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-lg border border-line bg-surface p-5">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-700 text-primary-200">
              <ShieldCheck size={18} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-ink">
                Auditoría inmutable
              </h3>
              <p className="mt-1 text-[14px] leading-relaxed text-secondary">
                Cada acción relevante queda registrada. El conocimiento no se
                pierde; queda como activo operativo.
              </p>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}