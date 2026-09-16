import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArrowRight, Mail } from "lucide-react";

export function MarketingCta() {
  return (
    <section className="bg-canvas">
      <Container className="py-24">
        <div className="relative overflow-hidden rounded-lg border border-line bg-primary-700 px-8 py-16 text-primary-200 md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(600px 300px at 90% 10%, var(--color-accent-300), transparent 60%), radial-gradient(500px 280px at 5% 95%, var(--color-primary-200), transparent 60%)",
            }}
          />
          <div className="relative max-w-2xl">
            <p className="eyebrow mb-4" style={{ color: "var(--color-primary-200)", opacity: 0.7 }}>
              Próximo paso
            </p>
            <h2 className="text-[28px] font-semibold leading-tight tracking-tight md:text-[40px]">
              Recorre el producto antes de conversar.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed opacity-90">
              Tenemos una demo navegable con datos ficticios. Recorre un ticket de
              punta a punta y, si quieres, después conversamos sobre cómo se
              adapta a tu organización.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-canvas px-5 text-[15px] font-medium text-primary-800 transition-colors hover:bg-surface"
              >
                Entrar a la demo
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary-200/40 bg-transparent px-5 text-[15px] font-medium text-primary-200 transition-colors hover:border-primary-200"
              >
                <Mail size={16} />
                Hablar con el equipo
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}