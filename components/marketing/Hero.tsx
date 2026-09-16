import Link from "next/link";
import { ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "./HeroVisual";

const ticker = [
  { label: "Workspaces orquestados", value: "1", suffix: "plataforma" },
  { label: "Sistemas compatibles", value: "BYOS", suffix: "postura abierta" },
  { label: "Workflows durables", value: "Diseñados", suffix: "idempotencia + audit" },
  { label: "Audit ledger", value: "Protegido", suffix: "trazabilidad real" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 drift-slow opacity-40"
        style={{
          background:
            "radial-gradient(900px 420px at 82% -8%, var(--color-primary-200), transparent 60%), radial-gradient(700px 320px at -8% 110%, var(--color-accent-300), transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 drift-slower opacity-25"
        style={{
          background:
            "radial-gradient(500px 280px at 50% 50%, var(--color-primary-200), transparent 60%)",
        }}
      />

      <div className="container-page relative pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <Reveal as="div" y={12} duration={500}>
              <p className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 backdrop-blur">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-primary-700 pulse-dot" />
                  <span className="absolute inset-0 rounded-full bg-primary-700" />
                </span>
                Enterprise Work Ecosystem
                <Sparkles size={12} className="text-primary-700" />
              </p>
            </Reveal>

            <Reveal as="h1" y={20} duration={700} delay={80}>
              <span className="block text-[34px] font-semibold leading-[1.05] tracking-tight text-ink md:text-[56px]">
                Tu equipo no necesita
              </span>
              <span className="mt-1 block text-[34px] font-semibold leading-[1.05] tracking-tight text-ink md:text-[56px]">
                otra plataforma.
              </span>
              <span className="mt-1 block text-[34px] font-semibold leading-[1.05] tracking-tight text-primary-700 md:text-[56px]">
                Necesita contexto.
              </span>
            </Reveal>

            <Reveal as="p" y={16} duration={600} delay={180}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-secondary md:text-[18px]">
                <strong className="font-semibold text-ink">DeskHUB</strong>{" "}
                conecta tus sistemas, mantiene viva la conversación y deja que
                cada equipo trabaje donde ya trabaja.{" "}
                <strong className="font-semibold text-ink">DeskWork</strong>{" "}
                es el producto.{" "}
                <strong className="font-semibold text-ink">DeskFlow</strong>{" "}
                es el motor que orquesta todo.
              </p>
            </Reveal>

            <Reveal as="div" y={12} duration={500} delay={260}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/demo"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-700 px-5 text-[15px] font-medium text-primary-200 transition-colors hover:bg-primary-800"
                >
                  Explorar la demo
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-line bg-surface px-5 text-[15px] font-medium text-ink transition-colors hover:border-ink/30"
                >
                  Solicitar una conversación
                  <ArrowUpRight size={16} className="text-secondary" />
                </Link>
              </div>
            </Reveal>

            <Reveal as="div" y={10} duration={500} delay={340}>
              <dl className="mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
                <div>
                  <dt className="eyebrow">Filosofía</dt>
                  <dd className="mt-2 text-[15px] font-medium text-ink">
                    Integrar antes que reemplazar
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Postura</dt>
                  <dd className="mt-2 text-[15px] font-medium text-ink">
                    BYOS · BYOT · DeskNow opcional
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Categoría</dt>
                  <dd className="mt-2 text-[15px] font-medium text-ink">
                    Work Ecosystem, no ERP / ITSM
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal y={24} duration={800} delay={120}>
            <HeroVisual />
          </Reveal>
        </div>

        <Reveal y={12} duration={500} delay={420}>
          <div className="mt-16 grid grid-cols-2 gap-4 border-t border-line pt-8 md:grid-cols-4">
            {ticker.map((t) => (
              <div key={t.label} className="rounded-md border border-line bg-surface/60 p-4 backdrop-blur">
                <p className="eyebrow">{t.label}</p>
                <p className="mt-2 font-mono text-[18px] font-semibold text-ink">
                  {t.value}
                </p>
                <p className="mt-1 text-[12px] text-muted">{t.suffix}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}