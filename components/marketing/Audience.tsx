import { Container } from "@/components/layout/Container";
import { Building2, Heart, Factory, GraduationCap } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Empresas en crecimiento",
    body: "Más de 5 sistemas, varios proveedores, un equipo pequeño que mantiene todo funcionando.",
  },
  {
    icon: Heart,
    title: "ONGs y fundaciones",
    body: "Voluntarios, regionales, presupuesto ajustado. El trabajo no se detiene por cambiar la planilla.",
  },
  {
    icon: Factory,
    title: "Operaciones distribuidas",
    body: "Sucursales, faenas, turnos. Necesitan procesos durables, no reuniones eternas.",
  },
  {
    icon: GraduationCap,
    title: "Instituciones educativas",
    body: "Equipos administrativos, académicos y técnicos que comparten infraestructura crítica.",
  },
];

export function Audience() {
  return (
    <section className="border-b border-line bg-canvas">
      <Container className="py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Para quién</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
            Diseñado para equipos que sostienen el trabajo,
            <br />
            <span className="text-primary-700">
              no para venderles otra pantalla más.
            </span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <article
              key={a.title}
              className="rounded-lg border border-line bg-surface p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-200 text-primary-700">
                <a.icon size={18} strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-[16px] font-semibold text-ink">
                {a.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-secondary">
                {a.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}