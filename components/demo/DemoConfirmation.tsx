import type { DemoNav } from "./DemoShell";
import { CheckCircle2, ListChecks, Plus } from "lucide-react";

export function DemoConfirmation({
  nav,
  ticketNumber,
}: {
  nav: DemoNav;
  ticketNumber: number;
}) {
  return (
    <div className="p-6 md:p-10">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-p4/20 text-p4">
          <CheckCircle2 size={28} strokeWidth={2} />
        </div>
        <h2 className="mt-6 text-[26px] font-semibold tracking-tight">
          Tu solicitud fue recibida.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-secondary">
          Te enviamos una confirmación a tu correo institucional. Un técnico la
          revisará en los próximos minutos.
        </p>

        <div className="mt-8 inline-flex items-baseline gap-2 rounded-md border border-line bg-canvas px-6 py-4">
          <span className="eyebrow">Ticket</span>
          <span className="font-mono text-[24px] font-semibold text-ink">
            #{ticketNumber}
          </span>
          <span className="rounded bg-p2/15 px-2 py-1 font-mono text-[11px] font-medium text-p2">
            P2
          </span>
        </div>

        <ol className="mt-10 grid gap-3 text-left md:grid-cols-3">
          <Step
            n={1}
            title="Recibido"
            body="Tu solicitud está en cola."
            done
          />
          <Step n={2} title="En diagnóstico" body="DeskFlow asignó un técnico." />
          <Step
            n={3}
            title="Resuelto"
            body="Te avisaremos por email cuando esté listo."
          />
        </ol>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => nav.goTickets()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-700 px-5 text-[14px] font-medium text-primary-200 hover:bg-primary-800"
          >
            <ListChecks size={14} />
            Ver bandeja
          </button>
          <button
            type="button"
            onClick={() => nav.goCreate()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-line bg-surface px-5 text-[14px] font-medium text-ink hover:border-ink/30"
          >
            <Plus size={14} />
            Crear otra
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  body,
  done,
}: {
  n: number;
  title: string;
  body: string;
  done?: boolean;
}) {
  return (
    <li
      className={`rounded-md border p-4 text-left ${
        done
          ? "border-p4/40 bg-p4/10"
          : "border-line bg-canvas"
      }`}
    >
      <p
        className={`font-mono text-[12px] font-medium ${
          done ? "text-p4" : "text-muted"
        }`}
      >
        {String(n).padStart(2, "0")}
      </p>
      <p className="mt-1 text-[14px] font-semibold text-ink">{title}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-secondary">{body}</p>
    </li>
  );
}