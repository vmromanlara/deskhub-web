import { Container } from "@/components/layout/Container";

export function Purpose() {
  return (
    <section className="border-b border-line bg-canvas">
      <Container className="grid gap-12 py-20 md:grid-cols-3 md:py-24">
        <div className="md:col-span-1">
          <p className="eyebrow">Propósito</p>
          <h2 className="mt-3 text-[26px] font-semibold tracking-tight md:text-[34px]">
            Empezamos resolviendo solicitudes.
            <br />
            <span className="text-primary-700">
              Evolucionamos aprendiendo de ellas.
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:col-span-2 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-6">
            <p className="eyebrow text-primary-700">Problema</p>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              Las solicitudes internas se pierden entre canales, los prioridades las
              pone quien grita más fuerte y nadie ve el patrón hasta que ya es
              tarde.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-6">
            <p className="eyebrow text-primary-700">Solución</p>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              Un único inbox institucional que prioriza por impacto, no por
              insistencia, y mantiene viva la conversación mientras se resuelve.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-6">
            <p className="eyebrow text-primary-700">Evolución</p>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              Los datos del día a día se vuelven conocimiento operativo: patrones
              que permiten mejorar la organización, no solo atender tickets.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}