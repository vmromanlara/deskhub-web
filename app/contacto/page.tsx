import type { Metadata } from "next";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Container } from "@/components/layout/Container";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Conversemos sobre cómo DeskHUB puede orquestar tus sistemas y devolverle contexto a tu equipo.",
  openGraph: {
    title: "Contacto — DeskHUB",
    description:
      "Conversemos sobre cómo DeskHUB puede orquestar tus sistemas.",
  },
};

export default function ContactoPage() {
  return (
    <>
      <section className="border-b border-line bg-canvas">
        <Container className="py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Conversemos</p>
            <h1 className="text-[32px] font-semibold leading-[1.1] tracking-tight md:text-[48px]">
              Cuéntanos qué necesitas orquestar.
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-secondary">
              Antes de cualquier propuesta, queremos entender qué sistemas
              tienes hoy, dónde se pierde el contexto y qué Outcome buscas.
              Déjanos tus datos y te respondemos en menos de 48 horas hábiles.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="grid gap-12 py-20 md:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <aside className="flex flex-col gap-6">
            <InfoRow
              icon={Mail}
              title="Correo"
              body="contacto@deskhub.cl"
              href="mailto:contacto@deskhub.cl"
            />
            <InfoRow
              icon={MessageCircle}
              title="Conversación"
              body="Te respondemos en menos de 48 horas hábiles."
            />
            <InfoRow
              icon={MapPin}
              title="Alcance"
              body="Chile · LATAM · remoto-first."
            />
            <div className="rounded-lg border border-line bg-canvas p-5 text-[13px] leading-relaxed text-secondary">
              <strong className="font-semibold text-ink">
                ¿Solo quieres ver el producto?
              </strong>{" "}
              Empieza por la{" "}
              <a href="/demo" className="text-primary-700 underline">
                demo navegable
              </a>
              . No requiere registro.
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  title,
  body,
  href,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  body: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-line bg-canvas p-5">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-200 text-primary-700">
        <Icon size={18} strokeWidth={2} />
      </div>
      <div>
        <p className="eyebrow">{title}</p>
        {href ? (
          <a
            href={href}
            className="mt-1 inline-block text-[14px] text-primary-700 underline break-all"
          >
            {body}
          </a>
        ) : (
          <p className="mt-1 text-[14px] text-ink">{body}</p>
        )}
      </div>
    </div>
  );
}