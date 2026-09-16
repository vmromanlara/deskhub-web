import { Container } from "@/components/layout/Container";
import { Eye } from "lucide-react";

const views = [
  {
    title: "Tickets",
    body: "Vista Kanban y lista. Filtros por estado, prioridad, categoría, técnico asignado, antigüedad y SLA en riesgo.",
  },
  {
    title: "Ticket detail",
    body: "Línea de tiempo con cada acción, adjuntos, respuestas internas, datos del solicitante y trazabilidad de SLA.",
  },
  {
    title: "Crear solicitud",
    body: "Asistente de 6 pasos: entrar, identificar, categoría, descripción, adjuntar imagen, enviar. El usuario nunca define prioridad ni SLA.",
  },
  {
    title: "Dashboard",
    body: "KPIs por área: backlog, primera respuesta, resolución, prioridades activas, picos por categoría, técnicos saturados.",
  },
];

export function Views() {
  return (
    <section className="border-b border-line bg-canvas">
      <Container className="py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Vistas del producto</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
            Cuatro vistas cubren el 90% del trabajo diario.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-secondary">
            No construimos pantallas decorativas. Cada vista responde una pregunta
            concreta del equipo que opera.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {views.map((v, i) => (
            <div
              key={v.title}
              className="overflow-hidden rounded-lg border border-line bg-surface"
            >
              <ViewMockup index={i} />
              <div className="border-t border-line p-6">
                <p className="eyebrow mb-2 inline-flex items-center gap-2">
                  <Eye size={12} className="text-primary-700" />
                  Vista {i + 1}
                </p>
                <h3 className="text-[18px] font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-secondary">
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ViewMockup({ index }: { index: number }) {
  if (index === 0) return <TicketsMockup />;
  if (index === 1) return <DetailMockup />;
  if (index === 2) return <CreateMockup />;
  return <DashboardMockup />;
}

function MockupShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-canvas p-4">
      <div className="overflow-hidden rounded-md border border-line bg-surface">
        <div className="flex items-center gap-1.5 border-b border-line bg-canvas px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-3 font-mono text-[10px] text-muted">
            deskwork.app
          </span>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function TicketsMockup() {
  const cols = [
    { name: "Abierto", count: 4, tone: "bg-p1/15" },
    { name: "En proceso", count: 6, tone: "bg-p3/15" },
    { name: "Esperando", count: 2, tone: "bg-secondary/10" },
    { name: "Resuelto", count: 9, tone: "bg-p4/15" },
  ];
  return (
    <MockupShell>
      <div className="grid grid-cols-4 gap-2">
        {cols.map((c) => (
          <div key={c.name} className="rounded border border-line bg-canvas p-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-medium text-secondary">
                {c.name}
              </span>
              <span className="rounded bg-line/50 px-1.5 text-[9px] font-mono text-muted">
                {c.count}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {Array.from({ length: Math.min(c.count, 3) }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded border border-line p-1.5 ${c.tone}`}
                >
                  <div className="h-1.5 w-3/4 rounded bg-ink/30" />
                  <div className="mt-1 h-1 w-1/2 rounded bg-ink/15" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
}

function DetailMockup() {
  return (
    <MockupShell>
      <div className="grid gap-3 md:grid-cols-[1fr_180px]">
        <div className="rounded border border-line bg-canvas p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-p2/20 px-1.5 py-0.5 font-mono text-[9px] font-medium text-p2">
              P2
            </span>
            <span className="text-[11px] font-medium text-ink">
              #4821 — Impresora de oficina sin conexión
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded bg-ink/15" />
            <div className="h-1.5 w-5/6 rounded bg-ink/15" />
            <div className="h-1.5 w-2/3 rounded bg-ink/15" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 rounded bg-surface p-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-700" />
              <span className="h-1 w-1/3 rounded bg-ink/30" />
            </div>
            <div className="flex items-center gap-2 rounded bg-surface p-2">
              <span className="h-1.5 w-1.5 rounded-full bg-p4" />
              <span className="h-1 w-1/4 rounded bg-ink/30" />
            </div>
          </div>
        </div>
        <div className="rounded border border-line bg-canvas p-3">
          <p className="text-[9px] font-medium uppercase text-muted">SLA</p>
          <p className="mt-1 font-mono text-[14px] font-semibold text-p2">
            02:14:38
          </p>
          <p className="mt-2 text-[9px] font-medium uppercase text-muted">
            Técnico
          </p>
          <p className="mt-1 text-[10px] text-secondary">M. Pérez</p>
          <p className="mt-2 text-[9px] font-medium uppercase text-muted">
            Categoría
          </p>
          <p className="mt-1 text-[10px] text-secondary">Impresora</p>
        </div>
      </div>
    </MockupShell>
  );
}

function CreateMockup() {
  const steps = ["Entrar", "Identificar", "Categoría", "Descripción", "Adjuntar", "Enviar"];
  return (
    <MockupShell>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`flex-1 rounded px-1.5 py-1 text-center text-[9px] ${i < 3 ? "bg-primary-700 text-primary-200" : "bg-line/40 text-muted"}`}
            >
              {i + 1}. {s}
            </div>
          ))}
        </div>
        <div className="rounded border border-line bg-canvas p-3">
          <p className="text-[11px] font-medium text-ink">¿Qué necesitas?</p>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {["Computador", "Correo", "Internet", "Impresora", "Accesos", "Software"].map((c) => (
              <div
                key={c}
                className="rounded border border-line bg-surface px-2 py-1.5 text-center text-[9px] text-secondary"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

function DashboardMockup() {
  const bars = [40, 65, 50, 80, 60, 90, 55];
  return (
    <MockupShell>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { label: "Abiertos", value: "42", tone: "text-p1" },
          { label: "Resueltos hoy", value: "27", tone: "text-p4" },
          { label: "SLA en riesgo", value: "5", tone: "text-p2" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded border border-line bg-canvas p-3">
            <p className="text-[9px] uppercase text-muted">{kpi.label}</p>
            <p className={`mt-1 font-mono text-[20px] font-semibold ${kpi.tone}`}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded border border-line bg-canvas p-3">
        <p className="mb-2 text-[10px] uppercase text-muted">Tickets por día</p>
        <div className="flex h-20 items-end gap-1">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-primary-700"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </MockupShell>
  );
}