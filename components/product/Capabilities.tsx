import { Container } from "@/components/layout/Container";
import {
  Inbox,
  Gauge,
  Timer,
  GitBranch,
  Bot,
  ChartLine,
  Workflow,
} from "lucide-react";

const caps = [
  {
    icon: Inbox,
    title: "Inbox unificado",
    body: "Web, email, WhatsApp y formularios internos convergen al mismo ticket. El usuario no aprende el sistema; el sistema aprende al usuario.",
  },
  {
    icon: Gauge,
    title: "Prioridad calculada",
    body: "El sistema asigna P1–P4 combinando cargo, tipo de incidencia, descripción e impacto. El usuario nunca define prioridad a mano.",
  },
  {
    icon: Timer,
    title: "Timer central",
    body: "Tiempo total, primera respuesta, efectivo, espera del usuario, resolución y SLA — visibles para quien lo necesita, sin interrumpir a quien no.",
  },
  {
    icon: GitBranch,
    title: "Estados Kanban",
    body: "Abierto · En proceso · Esperando usuario · Escalado · Resuelto · Cerrado. Drag & drop simple, transiciones auditadas.",
  },
  {
    icon: Workflow,
    title: "DeskFlow por debajo",
    body: "Procesos durables, idempotentes y trazables. Corre aunque el operador se vaya a dormir.",
  },
  {
    icon: ChartLine,
    title: "Dashboards vivos",
    body: "KPIs operativos actualizados en tiempo real. Lo que se mide, mejora; lo que no se mide, se improvisa.",
  },
  {
    icon: Bot,
    title: "IA evolutiva (post-MVP)",
    body: "Sugerir prioridad, buscar similares, proponer soluciones, resumir y detectar patrones. La IA observa primero, sugiere después, automatiza al final.",
  },
];

export function Capabilities() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Capacidades</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
            Lo que DeskWork hace hoy, sin vendernos humo.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {caps.map((c) => (
            <article
              key={c.title}
              className="rounded-lg border border-line bg-canvas p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-200 text-primary-700">
                <c.icon size={18} strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-[16px] font-semibold text-ink">
                {c.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-secondary">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}