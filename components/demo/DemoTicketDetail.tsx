import { useState } from "react";
import {
  mockTickets,
  priorityBadgeClass,
  statusBadgeClass,
} from "./mockData";
import type { DemoNav } from "./DemoShell";
import { ArrowLeft, Paperclip, Send } from "lucide-react";

export function DemoTicketDetail({
  nav,
  ticketId,
}: {
  nav: DemoNav;
  ticketId: string;
}) {
  const ticket = mockTickets.find((t) => t.id === ticketId);
  const [reply, setReply] = useState("");

  if (!ticket) {
    return (
      <div className="p-8">
        <p className="text-[14px] text-secondary">
          Ticket no encontrado.{" "}
          <button
            type="button"
            onClick={() => nav.goTickets()}
            className="text-primary-700 underline"
          >
            Volver a tickets
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-0 md:grid-cols-[1fr_280px]">
      <div className="border-line p-6 md:border-r md:p-8">
        <button
          type="button"
          onClick={() => nav.goTickets()}
          className="inline-flex items-center gap-2 text-[12px] font-medium text-secondary hover:text-ink"
        >
          <ArrowLeft size={14} />
          Bandeja
        </button>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded border px-2 py-1 font-mono text-[11px] font-medium ${priorityBadgeClass[ticket.priority]}`}
          >
            {ticket.priority}
          </span>
          <span
            className={`rounded border px-2 py-1 text-[11px] font-medium ${statusBadgeClass[ticket.status]}`}
          >
            {ticket.status}
          </span>
          <span className="font-mono text-[11px] text-muted">
            #{ticket.number}
          </span>
        </div>

        <h2 className="mt-4 text-[22px] font-semibold leading-tight tracking-tight">
          {ticket.title}
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-secondary">
          {ticket.description}
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2 text-[12px] text-secondary">
          <Paperclip size={14} />
          <span>2 adjuntos</span>
          <span className="text-muted">·</span>
          <span>foto-impresora.jpg, log-red.txt</span>
        </div>

        <h3 className="mt-8 text-[12px] font-medium uppercase tracking-wide text-muted">
          Conversación
        </h3>
        <ul className="mt-3 flex flex-col gap-3">
          {ticket.comments.length === 0 && (
            <li className="rounded-md border border-dashed border-line bg-canvas p-4 text-[13px] text-muted">
              Aún sin respuestas. Sé el primero en responder.
            </li>
          )}
          {ticket.comments.map((c, i) => (
            <li
              key={i}
              className="rounded-md border border-line bg-canvas p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium text-ink">
                  {c.author}{" "}
                  <span className="font-normal text-secondary">· {c.role}</span>
                </p>
                <span className="font-mono text-[11px] text-muted">{c.at}</span>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-secondary">
                {c.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-md border border-line bg-canvas p-4">
          <label
            htmlFor="reply"
            className="text-[12px] font-medium uppercase tracking-wide text-muted"
          >
            Responder (solo UI)
          </label>
          <textarea
            id="reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Escribe una respuesta interna o para el solicitante..."
            rows={3}
            className="mt-2 w-full resize-none rounded border border-line bg-surface p-3 text-[14px] text-ink outline-none placeholder:text-muted focus:border-primary-700"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setReply("")}
              className="inline-flex h-9 items-center gap-2 rounded-md bg-primary-700 px-4 text-[13px] font-medium text-primary-200 hover:bg-primary-800"
            >
              <Send size={14} />
              Enviar
            </button>
          </div>
        </div>
      </div>

      <aside className="bg-canvas p-6 md:p-8">
        <div>
          <p className="eyebrow">Solicitante</p>
          <p className="mt-2 text-[14px] font-medium text-ink">
            {ticket.requester}
          </p>
          <p className="text-[12px] text-secondary">{ticket.requesterRole}</p>
        </div>

        <div className="mt-6">
          <p className="eyebrow">Técnico asignado</p>
          <p className="mt-2 text-[14px] font-medium text-ink">
            {ticket.technician}
          </p>
        </div>

        <div className="mt-6">
          <p className="eyebrow">Categoría</p>
          <p className="mt-2 text-[14px] font-medium text-ink">
            {ticket.category}
          </p>
        </div>

        <div className="mt-6 rounded-md border border-line bg-surface p-4">
          <p className="eyebrow">SLA restante</p>
          <p
            className={`mt-2 font-mono text-[20px] font-semibold ${
              ticket.priority === "P1"
                ? "text-p1"
                : ticket.priority === "P2"
                  ? "text-p2"
                  : "text-p3"
            }`}
          >
            {ticket.slaRemaining}
          </p>
          <p className="mt-1 text-[11px] text-secondary">
            Calculado automáticamente por DeskFlow.
          </p>
        </div>

        <div className="mt-6">
          <p className="eyebrow">Creado</p>
          <p className="mt-2 text-[13px] text-secondary">{ticket.createdAt}</p>
          <p className="eyebrow mt-4">Última actualización</p>
          <p className="mt-2 text-[13px] text-secondary">{ticket.updatedAt}</p>
        </div>

        <button
          type="button"
          onClick={() => nav.goCreate()}
          className="mt-8 inline-flex h-10 w-full items-center justify-center rounded-md border border-line bg-surface text-[13px] font-medium text-secondary hover:border-ink/30 hover:text-ink"
        >
          Crear solicitud similar
        </button>
      </aside>
    </div>
  );
}