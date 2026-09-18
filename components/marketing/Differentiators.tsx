import { Container } from "@/components/layout/Container";
import { Layers, Puzzle, Telescope, Wallet } from "lucide-react";

const diffs = [
  {
    icon: Layers,
    title: "Conectamos sin reemplazar",
    body: "Cada sistema conserva su autoridad sobre sus datos. DeskWork conecta y coordina la conversación entre ellos; no se convierte en un nuevo ERP.",
  },
  {
    icon: Puzzle,
    title: "Integrar antes que reemplazar",
    body: "No pedimos migraciones. Conectamos lo que tienes, mejoramos su uso y, cuando el costo lo justifica, sustituimos gradualmente.",
  },
  {
    icon: Telescope,
    title: "Contexto preservado",
    body: "El por qué de cada decisión queda registrado y recuperable. El conocimiento operativo se vuelve un activo, no una reunión perdida.",
  },
  {
    icon: Wallet,
    title: "Economía predecible",
    body: "El costo de integrar un sistema nuevo es legible antes de firmarlo. Sin lock-in estructural ni facturas sorpresa por conector.",
  },
];

export function Differentiators() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Por qué es diferente</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
            No competimos con tu stack.
            <br />
            <span className="text-primary-700">
              Le devolvemos el contexto que perdió.
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {diffs.map((d) => (
            <article
              key={d.title}
              className="rounded-lg border border-line bg-canvas p-7"
            >
              <div className="inline-flex h-11 w-10 items-center justify-center rounded-md bg-primary-700 text-primary-200">
                <d.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-[18px] font-semibold text-ink">
                {d.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                {d.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}