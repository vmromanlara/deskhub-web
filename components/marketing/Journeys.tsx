"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { User, Wrench, BarChart3, ArrowRight } from "lucide-react";

type Persona = "solicitante" | "tecnico" | "gerente";

const personas: Array<{
  id: Persona;
  label: string;
  icon: typeof User;
  tagline: string;
  goal: string;
  steps: Array<{ t: string; b: string }>;
}> = [
  {
    id: "solicitante",
    label: "Solicitante",
    icon: User,
    tagline: "Carolina, asistente administrativa",
    goal: "Reportar una impresora que no responde y seguir con su día.",
    steps: [
      {
        t: "Entra al portal",
        b: "Sin login extra: la sesión institucional ya está activa.",
      },
      {
        t: "Se identifica automáticamente",
        b: "El sistema recupera nombre, cargo, departamento y jefatura.",
      },
      {
        t: "Elige categoría",
        b: "'Impresora'. Nunca ve un campo de prioridad.",
      },
      {
        t: "Describe el problema",
        b: "En sus palabras, con una foto del equipo.",
      },
      {
        t: "Envía y sigue con su día",
        b: "Recibe confirmación con número de ticket (#4821) y SLA estimado.",
      },
    ],
  },
  {
    id: "tecnico",
    label: "Técnico TI",
    icon: Wrench,
    tagline: "Mario, soporte TI (soporte único)",
    goal: "Atender el backlog sin quemarse y sin dejar nada caer.",
    steps: [
      {
        t: "Ve el inbox priorizado",
        b: "P1 arriba, P4 abajo. SLA visible en cada ticket.",
      },
      {
        t: "Atiende los que vencen primero",
        b: "No tiene que adivinar qué es urgente: el sistema ya lo calculó.",
      },
      {
        t: "Comunica sin salir del ticket",
        b: "Comentarios internos y respuestas al solicitante, con audit.",
      },
      {
        t: "Resuelve o escala",
        b: "Si bloquea, escala con contexto completo (no 'revisar tema').",
      },
      {
        t: "Cierra y deja aprendizaje",
        b: "La resolución alimenta el audit ledger y el conocimiento operativo.",
      },
    ],
  },
  {
    id: "gerente",
    label: "Gerencia",
    icon: BarChart3,
    tagline: "Patricia, jefa de operaciones",
    goal: "Ver el estado real y aprobar excepciones con datos.",
    steps: [
      {
        t: "Abre el dashboard",
        b: "KPIs por área: backlog, primera respuesta, SLA en riesgo.",
      },
      {
        t: "Detecta el patrón",
        b: "'3 tickets de red en sala 4 esta semana' — eso ya no es ruido.",
      },
      {
        t: "Aprueba una excepción",
        b: "Una compra de switch con contexto, no con intuición.",
      },
      {
        t: "Mide Outcome, no vanity",
        b: "Tiempo a primera respuesta, % resueltos en SLA, backlog activo.",
      },
      {
        t: "Mejora el sistema, no solo el síntoma",
        b: "Cada patrón alimenta una propuesta de mejora concreta.",
      },
    ],
  },
];

export function Journeys() {
  const [active, setActive] = useState<Persona>("solicitante");
  const persona = personas.find((p) => p.id === active)!;

  return (
    <section className="border-b border-line bg-canvas">
      <Container className="py-24">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow">Journeys</p>
            <h2 className="mt-3 text-[28px] font-semibold tracking-tight md:text-[40px]">
              Tres perfiles. Misma conversación. Distintos puntos de vista.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-secondary">
              DeskHUB está diseñado para que cada rol encuentre su valor sin
              tener que aprender el sistema de los demás.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-2">
            {personas.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-md border px-4 text-[14px] font-medium transition-colors",
                    active === p.id
                      ? "border-primary-700 bg-primary-700 text-primary-200"
                      : "border-line bg-surface text-secondary hover:border-ink/30 hover:text-ink",
                  )}
                >
                  <Icon size={14} strokeWidth={2} />
                  {p.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-lg border border-line bg-surface p-6">
              <p className="eyebrow">Persona</p>
              <p className="mt-2 text-[18px] font-semibold tracking-tight">
                {persona.tagline}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-secondary">
                <strong className="font-semibold text-ink">Objetivo:</strong>{" "}
                {persona.goal}
              </p>
            </aside>

            <ol className="grid gap-3">
              {persona.steps.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-line bg-surface p-5"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-200 font-mono text-[14px] font-semibold text-primary-800">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-[15px] font-semibold text-ink">
                      {s.t}
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-secondary">
                      {s.b}
                    </p>
                  </div>
                  {i < persona.steps.length - 1 && (
                    <ArrowRight
                      size={14}
                      className="mt-2 hidden shrink-0 text-muted md:block"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}