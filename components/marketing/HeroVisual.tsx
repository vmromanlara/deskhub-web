import { Inbox, Workflow, Plug, ShieldCheck } from "lucide-react";

const tiles = [
  {
    icon: Inbox,
    name: "DeskWork",
    role: "Workspace",
    color: "bg-primary-700 text-primary-200",
    detail: "Tickets · Proyectos · Conocimiento",
  },
  {
    icon: Workflow,
    name: "DeskFlow",
    role: "Motor de workflow",
    color: "bg-primary-200 text-primary-800",
    detail: "Durable · Idempotente · Auditado",
  },
  {
    icon: Plug,
    name: "Desk Integration",
    role: "Conectores",
    color: "bg-canvas text-ink border border-line",
    detail: "APIs · Webhooks · Credential vault",
  },
  {
    icon: ShieldCheck,
    name: "DeskCore",
    role: "Identidad",
    color: "bg-canvas text-ink border border-line",
    detail: "Multi-tenant · RLS · Servicios comunes",
  },
];

export function HeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-2 rounded-2xl opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(500px 280px at 60% 30%, var(--color-primary-200), transparent 70%), radial-gradient(380px 240px at 20% 80%, var(--color-accent-300), transparent 70%)",
        }}
      />
      <div className="relative rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_80px_-30px_rgba(13,79,74,0.35)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-p4" />
            <span className="eyebrow">Ecosistema DeskHUB</span>
          </div>
          <span className="font-mono text-[11px] text-muted">v1.2</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {tiles.map((t) => (
            <div
              key={t.name}
              className={`rounded-lg p-4 ${t.color}`}
            >
              <div className="flex items-center gap-2">
                <t.icon size={16} strokeWidth={2} />
                <span className="text-[13px] font-semibold">{t.name}</span>
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-wide opacity-70">
                {t.role}
              </p>
              <p className="mt-2 text-[12px] leading-snug opacity-90">
                {t.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-md border border-line bg-canvas px-3 py-2">
          <div className="flex items-center gap-2 text-[12px] text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-700 pulse-dot" />
            DeskFlow ejecutando 4 procesos
          </div>
          <span className="font-mono text-[11px] text-muted">live</span>
        </div>
      </div>
    </div>
  );
}