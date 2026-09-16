export function ArchitectureDiagram() {
  return (
    <div className="rounded-xl border border-line bg-canvas p-6">
      <div className="flex items-center justify-between">
        <p className="eyebrow">Diagrama conceptual</p>
        <span className="font-mono text-[11px] text-muted">
          DeskHUB · v1.2
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <Layer
          label="Usuarios"
          tone="muted"
          items={["Solicitante", "Técnico", "Gerencia"]}
        />
        <Arrow />

        <Layer
          label="DeskWork"
          tone="primary"
          items={["Workspaces", "Tickets", "Proyectos", "Conocimiento"]}
        />
        <Arrow />

        <Layer
          label="DeskFlow"
          tone="soft"
          items={["Workflows durables", "Reglas de SLA", "Idempotencia"]}
        />
        <Arrow />

        <Layer
          label="Desk Integration"
          tone="line"
          items={["Conectores", "APIs", "Webhooks", "Credential vault"]}
        />
        <Arrow />

        <Layer
          label="DeskCore"
          tone="line"
          items={["Identidad", "Multi-tenant", "RLS", "Audit base"]}
        />
        <Arrow />

        <Layer
          label="Sistemas externos"
          tone="muted"
          items={["ERP", "CRM", "Correo", "Calendar", "Archivos", "Identidad"]}
        />
      </div>

      <p className="mt-5 text-[12px] text-muted">
        Cada capa superior consume la inferior vía contratos explícitos. Las
        dependencias se evalúan contra DW-02 (decoupling) y DW-04 (lean
        canonical).
      </p>
    </div>
  );
}

function Layer({
  label,
  tone,
  items,
}: {
  label: string;
  tone: "primary" | "soft" | "line" | "muted";
  items: string[];
}) {
  const toneCls = {
    primary: "bg-primary-700 text-primary-200 border-primary-700",
    soft: "bg-primary-200 text-primary-800 border-primary-200",
    line: "bg-surface text-ink border-line",
    muted: "bg-canvas text-secondary border-line",
  }[tone];

  return (
    <div className={`rounded-md border p-4 ${toneCls}`}>
      <p className="eyebrow mb-2 opacity-80">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((i) => (
          <li
            key={i}
            className="rounded border border-current/20 bg-surface/30 px-2.5 py-1 font-mono text-[11px] text-current"
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center">
      <svg
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 0 V17 M1 12 L6 18 L11 12"
          stroke="var(--color-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}