import { Container } from "@/components/layout/Container";

type Layer = {
  id: string;
  name: string;
  role: string;
  note?: string;
  tone: "primary" | "soft" | "muted";
};

const layers: Layer[] = [
  {
    id: "deskhub",
    name: "DeskHUB",
    role: "Marca / Ecosistema",
    note: "No es un producto. Es el paraguas que articula todo lo que construimos.",
    tone: "muted",
  },
  {
    id: "deskwork",
    name: "DeskWork",
    role: "Producto — Workspace",
    note: "DeskCore + Desk Integration + DeskFlow. Lo que tu equipo abre todos los días.",
    tone: "primary",
  },
  {
    id: "deskcore",
    name: "DeskCore",
    role: "Identidad · Seguridad · Servicios comunes",
    tone: "soft",
  },
  {
    id: "deskintegration",
    name: "Desk Integration",
    role: "Conectores · APIs · Eventos · Credential vault",
    tone: "soft",
  },
  {
    id: "deskflow",
    name: "DeskFlow",
    role: "Motor de workflow · Durable · Idempotente",
    tone: "soft",
  },
  {
    id: "desknow",
    name: "DeskNow",
    role: "Soluciones funcionales nativas (opcional)",
    note: "Viven dentro de DeskWork. El cliente las contrata cuando las necesita.",
    tone: "muted",
  },
];

function toneClasses(tone: string) {
  switch (tone) {
    case "primary":
      return "border-primary-700 bg-primary-700 text-primary-200";
    case "soft":
      return "border-line bg-primary-200/60 text-ink";
    default:
      return "border-line bg-surface text-secondary";
  }
}

export function Ecosystem() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Ecosistema</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
            Una marca, un producto, tres componentes oficiales.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-secondary">
            <strong className="font-semibold text-ink">DeskHUB</strong> es la marca.
            <strong className="font-semibold text-ink"> DeskWork</strong> es el
            producto. <strong className="font-semibold text-ink">DeskFlow</strong>{" "}
            es el motor. Los demás componentes existen para sostener, conectar y
            coordinar — no para acumular pantallas.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {layers.map((l) => (
            <div
              key={l.id}
              className={`rounded-lg border p-6 ${toneClasses(l.tone)}`}
            >
              <p className="eyebrow mb-2" style={{ color: "currentColor", opacity: 0.7 }}>
                {l.role}
              </p>
              <p className="text-[20px] font-semibold tracking-tight">
                {l.name}
              </p>
              {l.note && (
                <p className="mt-3 text-[14px] leading-relaxed opacity-80">
                  {l.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-[14px] leading-relaxed text-muted">
          Principio mnemónico: <em>DeskCore sostiene. Desk Integration conecta.
          DeskFlow coordina. DeskWork presenta.</em>
        </p>
      </Container>
    </section>
  );
}