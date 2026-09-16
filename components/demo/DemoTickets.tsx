import {
  mockTickets,
  statusColumnOrder,
  statusBadgeClass,
  priorityBadgeClass,
} from "./mockData";
import type { DemoNav } from "./DemoShell";
import { Plus } from "lucide-react";

export function DemoTickets({ nav }: { nav: DemoNav }) {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Inbox institucional</p>
          <h2 className="mt-1 text-[20px] font-semibold tracking-tight">
            Tickets · vista Kanban
          </h2>
        </div>
        <button
          type="button"
          onClick={() => nav.goCreate()}
          className="inline-flex h-10 items-center gap-2 self-start rounded-md bg-primary-700 px-4 text-[13px] font-medium text-primary-200 hover:bg-primary-800"
        >
          <Plus size={14} />
          Nueva solicitud
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        {statusColumnOrder.map((status) => {
          const items = mockTickets.filter((t) => t.status === status);
          return (
            <div
              key={status}
              className="flex flex-col gap-2 rounded-md border border-line bg-canvas p-3"
            >
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted">
                  {status}
                </span>
                <span className="rounded bg-line/50 px-1.5 font-mono text-[10px] text-muted">
                  {items.length}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {items.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => nav.goTicket(t.id)}
                    className="group rounded-md border border-line bg-surface p-3 text-left transition-colors hover:border-primary-700/40"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium ${priorityBadgeClass[t.priority]}`}
                      >
                        {t.priority}
                      </span>
                      <span className="font-mono text-[10px] text-muted">
                        #{t.number}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] font-medium leading-snug text-ink group-hover:text-primary-700">
                      {t.title}
                    </p>
                    <p className="mt-2 text-[11px] text-secondary">
                      {t.requester} · {t.category}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-muted">
                      SLA {t.slaRemaining}
                    </p>
                  </button>
                ))}
                {items.length === 0 && (
                  <div className="rounded border border-dashed border-line bg-canvas p-3 text-center text-[11px] text-muted">
                    Sin tickets
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
        {(Object.keys(statusBadgeClass) as Array<keyof typeof statusBadgeClass>).map(
          (s) => (
            <span
              key={s}
              className={`rounded border px-2 py-1 ${statusBadgeClass[s]}`}
            >
              {s}
            </span>
          ),
        )}
      </div>
    </div>
  );
}