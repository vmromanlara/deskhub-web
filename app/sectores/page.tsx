import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { sectors } from "@/components/marketing/sectorData";
import { Heart, Building2, Factory, GraduationCap } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  path: "/sectores",
  title: "Sectores",
  description: "Donde DeskHUB ha demostrado encajar primero: ONGs y fundaciones, PYMEs, operaciones distribuidas, instituciones educativas.",
});
const iconMap = {
  ong: Heart,
  pyme: Building2,
  operaciones: Factory,
  educacion: GraduationCap,
} as const;

export default function SectoresPage() {
  return (
    <>
      <section className="border-b border-line bg-canvas">
        <Container className="py-20 md:py-28">
          <Reveal>
            <p className="eyebrow mb-4">Sectores</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-tight text-ink md:text-[52px]">
              No vendemos por vertical.
              <br />
              <span className="text-primary-700">
                Empezamos donde el contexto se pierde más rápido.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-secondary md:text-[18px]">
              Estos cuatro sectores son nuestro punto de partida. No son los
              únicos donde DeskHUB encaja — son los que más rápido pagan el
              costo de seguir sin contexto.
            </p>
          </Reveal>
        </Container>
      </section>

      {sectors.map((s, i) => {
        const Icon = iconMap[s.id];
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            className={`border-b border-line ${
              i % 2 === 0 ? "bg-surface" : "bg-canvas"
            }`}
          >
            <Container className="py-20 md:py-24">
              <div
                className={`grid gap-12 md:grid-cols-2 md:items-center ${
                  flip ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-700 text-primary-200">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <p className="eyebrow mt-5">{s.tag}</p>
                    <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-[16px] leading-relaxed text-secondary">
                      {s.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-line bg-canvas px-3 py-1 text-[12px] font-medium text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={120}>
                  <div className="rounded-xl border border-line bg-canvas p-6">
                    <p className="eyebrow mb-4">Desafíos típicos</p>
                    <ul className="space-y-3">
                      {s.challenges.map((c, j) => (
                        <li
                          key={c}
                          className="flex items-start gap-3 text-[14px] leading-relaxed text-secondary"
                        >
                          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-p1/20 font-mono text-[10px] font-semibold text-p1">
                            {j + 1}
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <Reveal>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-line bg-surface p-6">
                    <p className="eyebrow text-primary-700">Cómo lo abordamos</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                      {s.approach}
                    </p>
                  </div>
                  <div className="rounded-lg border border-line bg-surface p-6">
                    <p className="eyebrow text-primary-700">Outcome esperado</p>
                    <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-secondary">
                      {s.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-2"
                        >
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-p4" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </Container>
          </section>
        );
      })}

      <section className="bg-canvas">
        <Container className="py-24">
          <Reveal>
            <div className="rounded-lg border border-line bg-primary-700 p-10 text-primary-200 md:p-16">
              <p className="eyebrow mb-3" style={{ color: "var(--color-primary-200)", opacity: 0.7 }}>
                ¿No ves tu sector?
              </p>
              <h2 className="max-w-2xl text-[26px] font-semibold leading-tight tracking-tight md:text-[34px]">
                Si tu operación tiene 3 sistemas o más, DeskHUB probablemente
                encaja.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-90">
                Conversemos 30 minutos. Si vemos que no es para ti, te decimos
                con honestidad y, si podemos, te recomendamos algo que sí lo
                sea.
              </p>
              <Link
                href="/contacto"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-canvas px-5 text-[15px] font-medium text-primary-800 transition-colors hover:bg-surface"
              >
                Hablar con el equipo
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}