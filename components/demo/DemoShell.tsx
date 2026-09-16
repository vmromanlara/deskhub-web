"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { DemoHome } from "./DemoHome";
import { DemoTickets } from "./DemoTickets";
import { DemoTicketDetail } from "./DemoTicketDetail";
import { DemoCreateRequest } from "./DemoCreateRequest";
import { DemoConfirmation } from "./DemoConfirmation";
import { cn } from "@/lib/cn";

export type Screen =
  | { kind: "home" }
  | { kind: "tickets" }
  | { kind: "ticket"; id: string }
  | { kind: "create" }
  | { kind: "confirmation"; ticketNumber: number };

export type DemoNav = {
  goHome: () => void;
  goTickets: () => void;
  goTicket: (id: string) => void;
  goCreate: () => void;
  goConfirmation: (ticketNumber: number) => void;
  back: () => void;
};

const steps: Array<{ key: Screen["kind"]; label: string }> = [
  { key: "home", label: "Inicio" },
  { key: "tickets", label: "Tickets" },
  { key: "ticket", label: "Detalle" },
  { key: "create", label: "Nueva solicitud" },
  { key: "confirmation", label: "Confirmación" },
];

export function DemoShell() {
  const [stack, setStack] = useState<Screen[]>([{ kind: "home" }]);
  const router = useRouter();

  const current = stack[stack.length - 1];
  const currentIndex = steps.findIndex((s) => s.key === current.kind);

  const goHome = useCallback(() => setStack([{ kind: "home" }]), []);
  const goTickets = useCallback(() => setStack([{ kind: "home" }, { kind: "tickets" }]), []);
  const goTicket = useCallback(
    (id: string) => setStack((prev) => [...prev, { kind: "ticket", id }]),
    [],
  );
  const goCreate = useCallback(() => setStack([{ kind: "home" }, { kind: "create" }]), []);
  const goConfirmation = useCallback(
    (ticketNumber: number) =>
      setStack((prev) => [...prev, { kind: "confirmation", ticketNumber }]),
    [],
  );
  const back = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const nav: DemoNav = {
    goHome,
    goTickets,
    goTicket,
    goCreate,
    goConfirmation,
    back,
  };

  return (
    <div className="border-b border-line bg-canvas">
      <div className="container-page py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Demo navegable · datos ficticios</p>
            <h1 className="mt-2 text-[26px] font-semibold tracking-tight md:text-[32px]">
              Recorre DeskWork en cinco pantallas.
            </h1>
          </div>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex h-10 items-center justify-center rounded-md border border-line bg-surface px-4 text-[13px] font-medium text-secondary hover:border-ink/30 hover:text-ink"
          >
            Salir de la demo
          </button>
        </div>

        <Stepper current={currentIndex} />

        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
          {current.kind === "home" && <DemoHome nav={nav} />}
          {current.kind === "tickets" && <DemoTickets nav={nav} />}
          {current.kind === "ticket" && <DemoTicketDetail nav={nav} ticketId={current.id} />}
          {current.kind === "create" && <DemoCreateRequest nav={nav} />}
          {current.kind === "confirmation" && (
            <DemoConfirmation
              nav={nav}
              ticketNumber={current.ticketNumber}
            />
          )}
        </div>

        {stack.length > 1 && (
          <div className="mt-6">
            <button
              type="button"
              onClick={back}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-4 text-[13px] font-medium text-secondary hover:border-ink/30 hover:text-ink"
            >
              <ArrowLeft size={14} />
              Atrás
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-2 text-[12px]">
      {steps.map((s, i) => {
        const reached = i <= current;
        return (
          <li key={s.key} className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-medium",
                reached
                  ? "border-primary-700 bg-primary-700 text-primary-200"
                  : "border-line bg-surface text-muted",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "font-medium",
                reached ? "text-ink" : "text-muted",
              )}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <ChevronRight size={14} className="text-muted" />
            )}
          </li>
        );
      })}
    </ol>
  );
}