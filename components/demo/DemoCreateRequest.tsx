"use client";

import { useState } from "react";
import { categoryOptions, type Category } from "./mockData";
import type { DemoNav } from "./DemoShell";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const stepLabels: Record<Step, string> = {
  1: "Entrar",
  2: "Identificar",
  3: "Categoría",
  4: "Descripción",
  5: "Adjuntar",
  6: "Enviar",
};

export function DemoCreateRequest({ nav }: { nav: DemoNav }) {
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [description, setDescription] = useState("");
  const [withAttachment, setWithAttachment] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const next = () => {
    if (step < 6) setStep((s) => (s + 1) as Step);
  };
  const prev = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const submit = () => {
    setConfirmed(true);
    const nextNumber = 4822;
    setTimeout(() => nav.goConfirmation(nextNumber), 350);
  };

  const canAdvance = (() => {
    if (step === 3) return !!category;
    if (step === 4) return description.trim().length >= 8;
    return true;
  })();

  return (
    <div className="p-6 md:p-8">
      <p className="eyebrow">Nueva solicitud · asistente de 6 pasos</p>
      <h2 className="mt-1 text-[20px] font-semibold tracking-tight">
        Crear una solicitud
      </h2>

      <ol className="mt-6 flex flex-wrap gap-2">
        {([1, 2, 3, 4, 5, 6] as Step[]).map((s) => (
          <li
            key={s}
            className={cn(
              "flex items-center gap-2 rounded-md border px-3 py-1.5 text-[12px] font-medium",
              s === step
                ? "border-primary-700 bg-primary-700 text-primary-200"
                : s < step
                  ? "border-p4/40 bg-p4/15 text-p4"
                  : "border-line bg-canvas text-muted",
            )}
          >
            <span className="font-mono">{s}.</span>
            {stepLabels[s]}
            {s < step && <Check size={12} />}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-md border border-line bg-canvas p-6">
        {step === 1 && (
          <div>
            <p className="text-[14px] text-secondary">
              Ya estás autenticado en el portal institucional. No necesitas
              usuario ni contraseña adicional para crear solicitudes.
            </p>
            <div className="mt-4 rounded-md border border-line bg-surface p-4 text-[13px]">
              Sesión activa · <strong>Carolina Méndez</strong> · Asistente
              administrativa · Sede Santiago.
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-[14px] text-secondary">
              Verificamos tu identidad por tu correo institucional.
              Recupera automáticamente tu nombre, cargo, departamento y
              jefatura.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Field label="Nombre" value="Carolina Méndez" />
              <Field label="Cargo" value="Asistente administrativa" />
              <Field label="Departamento" value="Operaciones" />
              <Field label="Jefatura" value="Patricia Vidal" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-[14px] text-secondary">
              ¿En qué categoría encaja tu solicitud? La prioridad la calcula
              el sistema.
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              {categoryOptions.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "rounded-md border p-4 text-left transition-colors",
                    category === c.id
                      ? "border-primary-700 bg-primary-200/50"
                      : "border-line bg-surface hover:border-ink/30",
                  )}
                >
                  <p className="text-[14px] font-medium text-ink">{c.label}</p>
                  <p className="mt-1 text-[12px] text-secondary">{c.hint}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <label
              htmlFor="description"
              className="text-[13px] font-medium text-ink"
            >
              Cuéntanos qué pasa
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Describe el problema con el mayor detalle posible. ¿Desde cuándo? ¿A qué hora? ¿Qué has intentado?"
              className="mt-2 w-full resize-none rounded-md border border-line bg-surface p-3 text-[14px] text-ink outline-none placeholder:text-muted focus:border-primary-700"
            />
            <p className="mt-2 text-[12px] text-muted">
              {description.trim().length} caracteres · mínimo 8
            </p>
          </div>
        )}

        {step === 5 && (
          <div>
            <p className="text-[14px] text-secondary">
              Adjuntar evidencia ayuda a reducir el tiempo de diagnóstico.
            </p>
            <label
              className={cn(
                "mt-4 flex cursor-pointer items-center gap-3 rounded-md border border-dashed bg-surface p-4 transition-colors",
                withAttachment
                  ? "border-primary-700 bg-primary-200/30"
                  : "border-line",
              )}
            >
              <input
                type="checkbox"
                checked={withAttachment}
                onChange={(e) => setWithAttachment(e.target.checked)}
                className="h-4 w-4 accent-primary-700"
              />
              <span className="text-[13px] font-medium text-ink">
                Incluir foto o archivo (ficticio)
              </span>
              <span className="text-[12px] text-secondary">
                foto-impresora.jpg
              </span>
            </label>
            <p className="mt-3 text-[12px] text-muted">
              Esta demo no sube archivos reales.
            </p>
          </div>
        )}

        {step === 6 && (
          <div>
            <p className="text-[14px] text-secondary">
              Revisa antes de enviar. Tu ticket se creará con prioridad
              calculada automáticamente.
            </p>
            <dl className="mt-4 grid gap-3 rounded-md border border-line bg-surface p-5 text-[14px] md:grid-cols-2">
              <Row k="Categoría" v={category ?? "—"} />
              <Row k="Prioridad" v="Calculada por DeskFlow (mock)" />
              <Row k="Solicitante" v="Carolina Méndez" />
              <Row k="Departamento" v="Operaciones" />
              <Row
                k="Descripción"
                v={description || "—"}
                full
              />
              <Row k="Adjuntos" v={withAttachment ? "1 archivo (ficticio)" : "—"} />
            </dl>
            {confirmed && (
              <p className="mt-4 text-[13px] text-p4">
                Enviando ticket…
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={step === 1}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-line bg-surface px-5 text-[13px] font-medium text-secondary disabled:opacity-40"
        >
          <ChevronLeft size={14} />
          Atrás
        </button>
        {step < 6 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-700 px-6 text-[14px] font-medium text-primary-200 disabled:opacity-40"
          >
            Continuar
            <ChevronRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={confirmed}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-700 px-6 text-[14px] font-medium text-primary-200 disabled:opacity-40"
          >
            Enviar solicitud
            <Check size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-surface p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-1 text-[14px] text-ink">{value}</p>
    </div>
  );
}

function Row({
  k,
  v,
  full,
}: {
  k: string;
  v: string;
  full?: boolean;
}) {
  return (
    <div className={cn(full && "md:col-span-2")}>
      <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">
        {k}
      </dt>
      <dd className="mt-1 text-[14px] text-ink">{v}</dd>
    </div>
  );
}