import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ManifestoCta } from "@/components/marketing/ManifestoCta";

export const metadata: Metadata = {
  title: "Manifiesto",
  description:
    "Cómo pensamos DeskHUB: integrar antes que reemplazar, contexto sobre pantallas, economía predecible, posture BYOS/BYOT.",
  openGraph: {
    title: "Manifiesto — DeskHUB",
    description: "Cómo pensamos DeskHUB.",
  },
};

const beliefs = [
  {
    n: "01",
    title: "El contexto es el activo",
    body: "El conocimiento operativo se pierde entre tickets, reuniones y hojas de cálculo. Nuestro trabajo es devolver ese activo a la organización.",
  },
  {
    n: "02",
    title: "Integrar antes que reemplazar",
    body: "Reemplazar un sistema no devuelve el contexto. Conectar lo que ya existe, sí. Cuando el costo de reemplazar lo justifique, sustituimos progresivamente.",
  },
  {
    n: "03",
    title: "Orquestar, no absorber",
    body: "DeskHUB no quiere ser el nuevo ERP. Cada sistema conserva su autoridad sobre su dato; nosotros mantenemos la conversación entre ellos.",
  },
  {
    n: "04",
    title: "BYOS · BYOT · DeskNow opcional",
    body: "Bring Your Own Software. Bring Your Own Technology. Las soluciones nativas (DeskNow) existen cuando el cliente las necesita, no cuando a nosotros nos conviene.",
  },
  {
    n: "05",
    title: "Lock-in estructural es deuda",
    body: "Cada decisión técnica se valida contra los principios DW-01..DW-10. La velocidad es bienvenida; el lock-in estructural, no.",
  },
  {
    n: "06",
    title: "El usuario define el problema, el sistema calcula la prioridad",
    body: "El usuario nunca define SLA, prioridad ni técnico. Esa es tarea del motor, no de quien sufre la incidencia.",
  },
  {
    n: "07",
    title: "Auditable por defecto",
    body: "Toda acción relevante queda registrada. El audit ledger es inmutable. La trazabilidad no es opcional, es estructural.",
  },
  {
    n: "08",
    title: "Economía predecible",
    body: "El costo de integrar un sistema nuevo debe ser legible antes de firmarlo. Sin facturas sorpresa por conector.",
  },
];

const nonGoals = [
  "No somos un ERP.",
  "No somos un CRM.",
  "No somos un ITSM enterprise.",
  "No somos un workflow engine genérico.",
  "No somos 'un solo lugar para todos los datos'.",
  "No creemos que sumar plataformas resuelva la fragmentación.",
];

export default function ManifiestoPage() {
  return (
    <>
      <section className="border-b border-line bg-canvas">
        <Container className="py-20 md:py-28">
          <Reveal>
            <p className="eyebrow mb-4">Manifiesto</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-tight text-ink md:text-[56px]">
              Creemos que el problema de las empresas
              <br />
              <span className="text-primary-700">no es de software.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-secondary md:text-[18px]">
              Es un problema de contexto. Comprar más plataformas no lo
              resuelve. Reemplazar sistemas no lo resuelve. Lo que devuelve el
              contexto es un ecosistema que mantiene viva la conversación entre
              personas, sistemas y datos. Eso es lo que construimos.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-surface">
        <Container className="py-24">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="eyebrow">En qué creemos</p>
              <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
                Ocho principios que gobiernan cada decisión.
              </h2>
            </div>
          </Reveal>

          <ol className="grid gap-6 md:grid-cols-2">
            {beliefs.map((b, i) => (
              <Reveal key={b.n} delay={i * 60}>
                <li className="rounded-lg border border-line bg-canvas p-7">
                  <p className="font-mono text-[12px] font-medium text-primary-700">
                    {b.n}
                  </p>
                  <h3 className="mt-3 text-[19px] font-semibold leading-tight tracking-tight text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                    {b.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-line bg-canvas">
        <Container className="py-24">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow">Lo que no somos</p>
              <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
                Definirnos por exclusión también es posture.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-secondary">
                La categoría propia no se inventa: se aclara. DeskHUB no compite
                en tu stack; se posiciona <em>entre</em> tus sistemas.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {nonGoals.map((ng) => (
                <li
                  key={ng}
                  className="flex items-start gap-3 rounded-md border border-line bg-surface px-5 py-4 text-[15px] font-medium text-ink"
                >
                  <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary-700" />
                  {ng}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <ManifestoCta />
    </>
  );
}