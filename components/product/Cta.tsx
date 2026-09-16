import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArrowRight } from "lucide-react";

export function ProductCta() {
  return (
    <section className="bg-surface">
      <Container className="py-24">
        <div className="rounded-lg border border-line bg-canvas px-8 py-16 text-center md:px-16">
          <p className="eyebrow mb-4">Ver antes de leer</p>
          <h2 className="mx-auto max-w-2xl text-[26px] font-semibold tracking-tight md:text-[36px]">
            Recorre DeskWork como si fueras un técnico de turno.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-secondary">
            La demo navegable usa datos ficticios. No requiere registro, no
            requiere instalación. Cinco pantallas, una conversación.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/demo"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-700 px-6 text-[15px] font-medium text-primary-200 transition-colors hover:bg-primary-800"
            >
              Abrir la demo
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}