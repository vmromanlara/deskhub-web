import {
  Inbox,
  PlusCircle,
  BarChart3,
  BookOpen,
  Users,
} from "lucide-react";
import { kpis } from "./mockData";
import type { DemoNav } from "./DemoShell";

const entries = [
  {
    icon: Inbox,
    title: "Ver tickets",
    body: "Recorre el inbox institucional con prioridades calculadas, SLA vivo y estados Kanban.",
    cta: "Abrir bandeja",
    action: (nav: DemoNav) => nav.goTickets(),
  },
  {
    icon: PlusCircle,
    title: "Crear solicitud",
    body: "Asistente de 6 pasos. El usuario nunca define prioridad ni SLA.",
    cta: "Iniciar solicitud",
    action: (nav: DemoNav) => nav.goCreate(),
  },
  {
    icon: BarChart3,
    title: "Dashboards vivos",
    body: "KPIs operativos actualizados en tiempo real para el equipo que sostiene la operación.",
    cta: "Vista previa",
    action: (nav: DemoNav) => nav.goTickets(),
  },
  {
    icon: BookOpen,
    title: "Conocimiento operativo",
    body: "Cada resolución deja rastro. El conocimiento se vuelve activo, no se pierde en una reunión.",
    cta: "Vista previa",
    action: (nav: DemoNav) => nav.goTickets(),
  },
] as const;

export function DemoHome({ nav }: { nav: DemoNav }) {
  return (
    <div className="p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-md border border-line bg-canvas p-4"
          >
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
              {k.label}
            </p>
            <p className={`mt-2 font-mono text-[22px] font-semibold ${k.tone}`}>
              {k.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {entries.map((e) => (
          <button
            type="button"
            key={e.title}
            onClick={() => e.action(nav)}
            className="group flex items-start gap-4 rounded-md border border-line bg-canvas p-5 text-left transition-colors hover:border-primary-700/40 hover:bg-primary-200/20"
          >
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-700 text-primary-200">
              <e.icon size={18} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-ink">{e.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-secondary">
                {e.body}
              </p>
              <p className="mt-3 text-[12px] font-medium text-primary-700 group-hover:underline">
                {e.cta} →
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-md border border-line bg-primary-200/40 p-4 text-[13px] text-primary-800">
        <Users size={16} />
        Estás navegando como <strong className="font-semibold">Carolina Méndez</strong> ·
        Asistente administrativa · Sede Santiago.
      </div>
    </div>
  );
}