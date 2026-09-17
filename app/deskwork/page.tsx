import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Purpose } from "@/components/product/Purpose";
import { Capabilities } from "@/components/product/Capabilities";
import { Views } from "@/components/product/Views";
import { Architecture } from "@/components/product/Architecture";
import { Sectors } from "@/components/product/Sectors";
import { ProductCta } from "@/components/product/Cta";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = buildMetadata({
  path: "/deskwork",
  title: "DeskWork",
  description:
    "DeskWork es el workspace institucional: tickets con prioridad calculada, timer central, workflow durable y dashboards vivos. La plataforma que tu equipo realmente abre todos los días.",
});

export default function DeskWorkPage() {
  return (
    <>
      <ProductHero />
      <Purpose />
      <Capabilities />
      <Views />
      <Architecture />
      <Sectors />
      <ProductCta />
    </>
  );
}

function ProductHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(700px 320px at 80% -20%, var(--color-primary-200), transparent 60%)",
        }}
      />
      <Container className="relative py-20 md:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Producto</p>
          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-tight text-ink md:text-[52px]">
            <span className="text-primary-700">DeskWork</span>:
            la plataforma que tu equipo abre todos los días.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-secondary">
            Un workspace con contexto, alimentado por un motor de workflow
            durable y una capa de integración con tus sistemas. Diseñado para
            resolver primero y aprender después.
          </p>
        </div>
      </Container>
    </section>
  );
}