import { Container } from "@/components/layout/Container";
import { Heart, Building2, Factory, GraduationCap } from "lucide-react";

const sectors = [
  {
    icon: Heart,
    name: "ONGs y fundaciones",
    body: "Voluntarios, regionales, presupuesto limitado. El trabajo no para por cambios de planilla.",
  },
  {
    icon: Building2,
    name: "PYMEs en crecimiento",
    body: "5 a 50 personas, varios proveedores, un equipo TI pequeño que mantiene el mundo funcionando.",
  },
  {
    icon: Factory,
    name: "Operaciones distribuidas",
    body: "Sucursales, faenas, turnos rotativos. Los procesos deben correr aunque la red falle.",
  },
  {
    icon: GraduationCap,
    name: "Instituciones educativas",
    body: "Equipos administrativos, académicos y técnicos compartiendo infraestructura crítica.",
  },
];

export function Sectors() {
  return (
    <section className="border-b border-line bg-canvas">
      <Container className="py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Sectores</p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
            Donde DeskWork ha demostrado encajar primero.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <article
              key={s.name}
              className="rounded-lg border border-line bg-surface p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-200 text-primary-700">
                <s.icon size={18} strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-[16px] font-semibold text-ink">
                {s.name}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-secondary">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}