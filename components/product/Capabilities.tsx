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
    body: "Web, email y formularios internos convergen al mismo ticket. El usuario no aprende el sistema; el sistema aprende al usuario.",
    status: "Current",
  },
  {
    icon: Gauge,
    title: "Prioridad calculada",
    body: "El sistema asigna P1–P4 combinando cargo, tipo de incidencia, descripción e impacto. El usuario nunca define prioridad a mano.",
    status: "Current",
  },
  {
    icon: Timer,
    title: "Timer central",
    body: "Tiempo total, primera respuesta, efectivo, espera del usuario, resolución y SLA — visibles para quien lo necesita, sin interrumpir a quien no.",
    status: "Current",
  },
  {
    icon: GitBranch,
    title: "Estados Kanban",
    body: "Abierto · En proceso · Esperando usuario · Escalado · Resuelto · Cerrado. Drag & drop simple, transiciones auditadas.",
    status: "Current",
  },
  {
    icon: Workflow,
    title: "DeskFlow por debajo",
    body: "Motor de workflow del ecosistema: durable, idempotente y trazable. Diseñado para sostener procesos multi-paso aunque el operador se desconecte.",
    status: "Current",
  },
  {
    icon: ChartLine,
    title: "Dashboards vivos",
    body: "KPIs operativos por área — backlog, primera respuesta, SLA en riesgo, resolución. Actualizados a partir de los datos reales del workspace.",
    status: "Current",
  },
  {
    icon: Bot,
    title: "IA evolutiva",
    body: "Sugerir prioridad, buscar similares, proponer soluciones, resumir y detectar patrones. La IA observa primero, sugiere después, automatiza al final.",
    status: "Future Vision",
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
          <p className="mt-4 text-[15px] leading-relaxed text-secondary">
            Cada capacidad está etiquetada con su estado real.{" "}
            <strong className="font-semibold text-ink">Current</strong> está en
            el alcance vigente; <strong className="font-semibold text-ink">Future Vision</strong>{" "}
            está diseñada pero no construida.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {caps.map((c) => (
            <article
              key={c.title}
              className="relative rounded-lg border border-line bg-canvas p-6"
            >
              <span
                className={
                  c.status === "Current"
                    ? "absolute right-4 top-4 rounded border border-primary-700/40 bg-primary-200 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wide text-primary-800"
                    : "absolute right-4 top-4 rounded border border-muted/40 bg-canvas px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wide text-muted"
                }
              >
                {c.status}
              </span>
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