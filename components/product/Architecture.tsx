import { Container } from "@/components/layout/Container";

const layers = [
  {
    name: "DeskWork (producto)",
    role: "Workspaces · UI · experiencia del equipo",
    color: "bg-primary-700 text-primary-200",
  },
  {
    name: "DeskFlow (motor de workflow)",
    role: "Procesos durables, idempotentes, auditados",
    color: "bg-primary-200 text-ink",
  },
  {
    name: "Desk Integration",
    role: "Conectores · APIs · Webhooks · Credential vault",
    color: "bg-canvas text-ink border border-line",
  },
  {
    name: "DeskCore",
    role: "Identidad · Multi-tenant · RLS · Servicios comunes · Audit base",
    color: "bg-canvas text-ink border border-line",
  },
];

const principles = [
  { id: "DW-01", text: "System of Record & Conflict Governance" },
  { id: "DW-02", text: "Decoupled Workflow Engine — DeskFlow no depende de n8n" },
  { id: "DW-03", text: "Durable Execution & Idempotency" },
  { id: "DW-04", text: "Lean Canonical Model" },
  { id: "DW-05", text: "Federated Authorization" },
  { id: "DW-08", text: "Immutable Audit Ledger" },
  { id: "DW-09", text: "Ecosystem Coexistence — integrar antes que reemplazar" },
];

export function Architecture() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Arquitectura conceptual</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
            Una constitución técnica,
            <br />
            <span className="text-primary-700">no una lista de buzzwords.</span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-secondary">
            Cada decisión de DeskWork se valida contra principios DW-01 a
            DW-10. Aquí los visibles para el producto, no los internos de
            plataforma.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-3">
            {layers.map((l, i) => (
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
            <div className="mt-2 rounded-md border border-dashed border-line bg-canvas p-4 text-[12px] text-muted">
              <strong className="text-ink">Sistemas externos:</strong> ERP, CRM,
              correo, calendar, archivos, identidad. DeskWork conecta y coordina;
              cada sistema conserva su autoridad sobre su dato.
            </div>
          </div>

          <ul className="rounded-lg border border-line bg-canvas p-6">
            <p className="eyebrow mb-4">Principios visibles</p>
            {principles.map((p) => (
              <li
                key={p.id}
                className="flex items-start gap-3 border-b border-line py-3 last:border-b-0 last:pb-0"
              >
                <span className="mt-0.5 inline-flex h-7 shrink-0 items-center justify-center rounded bg-primary-700 px-2 font-mono text-[11px] font-medium text-primary-200">
                  {p.id}
                </span>
                <span className="text-[14px] leading-relaxed text-ink">
                  {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}