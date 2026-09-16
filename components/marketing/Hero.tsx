import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(900px 400px at 80% -10%, var(--color-primary-200), transparent 60%), radial-gradient(700px 300px at -10% 110%, var(--color-accent-300), transparent 55%)",
        }}
      />
      <div className="container-page relative pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5">
            <Sparkles size={12} className="text-primary-700" />
            Enterprise Work Ecosystem
          </p>

          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-tight text-ink md:text-[56px]">
            Tu equipo no necesita otra plataforma.
            <br />
            <span className="text-primary-700">
              Necesita un lugar donde el trabajo tenga contexto.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-secondary md:text-[18px]">
            <strong className="font-semibold text-ink">DeskHUB</strong> es el ecosistema
            que conecta tus sistemas, mantiene viva la conversación y deja que cada equipo
            trabaje donde ya trabaja. <strong className="font-semibold text-ink">DeskWork</strong>{" "}
            es el producto. <strong className="font-semibold text-ink">DeskFlow</strong>{" "}
            es el motor que orquesta todo.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-700 px-5 text-[15px] font-medium text-primary-200 transition-colors hover:bg-primary-800"
            >
              Explorar la demo
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex h-12 items-center justify-center rounded-md border border-line bg-surface px-5 text-[15px] font-medium text-ink transition-colors hover:border-ink/20"
            >
              Solicitar una conversación
            </Link>
          </div>

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
        </div>
      </div>
    </section>
  );
}