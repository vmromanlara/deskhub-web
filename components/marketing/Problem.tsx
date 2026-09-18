import { Container } from "@/components/layout/Container";
import { AlertTriangle, Scissors, SearchX } from "lucide-react";

const pains = [
  {
    icon: Scissors,
    title: "Sistemas que no se hablan",
    body: "Tickets en un lado, aprobaciones en otro, datos en un tercero. El trabajo se pierde entre plataformas y nadie ve el cuadro completo.",
  },
  {
    icon: SearchX,
    title: "Contexto que se evapora",
    body: "Cuando algo cambia de sistema, se pierde el por qué. El equipo reconstruye memoria todos los días en lugar de operar.",
  },
  {
    icon: AlertTriangle,
    title: "Otra plataforma más, no la solución",
    body: "Sumar herramientas no resolvió el problema: lo multiplicó. Lo que hace falta es un ecosistema que centraliza, integra y organiza lo que ya tienes.",
  },
];

export function Problem() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">El problema</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
            Las empresas no tienen un problema de software.
            <br />
            <span className="text-primary-700">
              Tienen un problema de contexto.
            </span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-secondary">
            Comprar más plataformas no devuelve el contexto. Reemplazar sistemas no
            devuelve el contexto. Lo que devuelve el contexto es un ecosistema que
            centraliza, integra y organiza lo que ya tienes entre personas,
            sistemas y datos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pains.map((p) => (
            <article
              key={p.title}
              className="rounded-lg border border-line bg-canvas p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-200 text-primary-700">
                <p.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-[18px] font-semibold text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}