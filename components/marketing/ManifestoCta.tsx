import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ManifestoCta() {
  return (
    <section className="bg-surface">
      <Container className="py-24">
        <Reveal>
          <div className="rounded-lg border border-line bg-canvas p-10 text-center md:p-16">
            <p className="eyebrow mb-3">Cómo se traduce esto en producto</p>
            <h2 className="mx-auto max-w-2xl text-[26px] font-semibold tracking-tight md:text-[36px]">
              Mira DeskWork en acción.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-secondary">
              Cinco pantallas con datos ficticios para recorrer el producto.
              Después, si quieres, lo aterrizamos a tu organización.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-700 px-5 text-[15px] font-medium text-primary-200 transition-colors hover:bg-primary-800"
              >
                Abrir la demo
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/arquitectura"
                className="inline-flex h-12 items-center justify-center rounded-md border border-line bg-surface px-5 text-[15px] font-medium text-ink hover:border-ink/30"
              >
                Ver la arquitectura
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}