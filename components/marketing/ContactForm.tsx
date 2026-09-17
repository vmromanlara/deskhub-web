"use client";

import { useMemo, useState } from "react";
import { Send, Beaker, Mail, Pencil } from "lucide-react";

type FormState = {
  nombre: string;
  organizacion: string;
  cargo: string;
  email: string;
  interes: string;
  mensaje: string;
};

const initial: FormState = {
  nombre: "",
  organizacion: "",
  cargo: "",
  email: "",
  interes: "Evaluación general",
  mensaje: "",
};

const TARGET_EMAIL = "contacto@deskhub.cl";
const SUBJECT_PREFIX = "[DeskHUB] Consulta desde web";

const intereses = [
  "Evaluación general",
  "Demo guiada",
  "Piloto en mi organización",
  "Integración con sistemas propios",
  "Hablar con el equipo comercial",
];

const errorsFrom = (f: FormState): Partial<Record<keyof FormState, string>> => {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (!f.nombre.trim()) e.nombre = "Necesitamos tu nombre.";
  if (!f.organizacion.trim())
    e.organizacion = "¿En qué organización trabajas?";
  if (!f.cargo.trim()) e.cargo = "Indícanos tu cargo.";
  if (!f.email.trim()) e.email = "Necesitamos un correo de contacto.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "Ese correo no se ve válido.";
  if (f.mensaje.trim().length < 20)
    e.mensaje = "Cuéntanos un poco más (mínimo 20 caracteres).";
  return e;
};

function buildMailto(f: FormState): string {
  const subject = `${SUBJECT_PREFIX} — ${f.interes}`;
  const body = [
    "Hola equipo DeskHUB,",
    "",
    `Mi nombre es ${f.nombre}, ${f.cargo} en ${f.organizacion}.`,
    `Correo de contacto: ${f.email}`,
    `Interés: ${f.interes}`,
    "",
    "Mensaje:",
    f.mensaje,
    "",
    "--",
    "Enviado desde el formulario de www.deskhub.cl/contacto",
  ].join("\n");
  const params = new URLSearchParams({ subject, body });
  return `mailto:${TARGET_EMAIL}?${params.toString()}`;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [readyToSend, setReadyToSend] = useState(false);

  const mailto = useMemo(() => buildMailto(form), [form]);

  const update =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [k]: e.target.value }));
      if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = errorsFrom(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setReadyToSend(false);
      return;
    }
    setErrors({});
    setReadyToSend(true);
  };

  const edit = () => {
    setReadyToSend(false);
  };

  if (readyToSend) {
    return (
      <div
        className="rounded-lg border border-line bg-canvas p-6 md:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3 rounded-md border border-line bg-surface p-4">
          <Mail
            size={16}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-primary-700"
          />
          <p className="text-[13px] leading-relaxed text-secondary">
            <strong className="font-semibold text-ink">
              Tu mensaje está listo para enviar.
            </strong>{" "}
            Al presionar <em>Enviar mensaje</em> en el formulario, abrimos tu
            cliente de correo con un mensaje pre-armado dirigido a{" "}
            <code className="rounded bg-canvas px-1.5 py-0.5 text-[12px]">
              {TARGET_EMAIL}
            </code>
            . Si tu navegador bloqueó la apertura automática, usa el botón de
            abajo para abrirlo manualmente.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={mailto}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-700 px-5 text-[14px] font-medium text-primary-200 hover:bg-primary-800"
          >
            <Send size={14} />
            Abrir mi cliente de correo
          </a>
          <button
            type="button"
            onClick={edit}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-line bg-surface px-5 text-[14px] font-medium text-ink hover:bg-canvas"
          >
            <Pencil size={14} />
            Editar el mensaje
          </button>
        </div>

        <p className="mt-4 text-[12px] text-muted">
          Tu mensaje no se transmite desde el servidor: lo entregas tú
          directamente desde tu cliente de correo a{" "}
          <a
            href={`mailto:${TARGET_EMAIL}`}
            className="text-primary-700 underline"
          >
            {TARGET_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      className="rounded-lg border border-line bg-canvas p-6 md:p-8"
    >
      <div
        id="contact-form-disclosure"
        className="mb-6 flex items-start gap-3 rounded-md border border-line bg-surface p-4"
      >
        <Beaker
          size={16}
          strokeWidth={2}
          className="mt-0.5 shrink-0 text-primary-700"
        />
        <p className="text-[12px] leading-relaxed text-secondary">
          <strong className="font-semibold text-ink">
            Cómo funciona este formulario.
          </strong>{" "}
          Completas los campos y, al hacer clic en <em>Enviar mensaje</em>, se
          abre tu cliente de correo con un mensaje pre-armado dirigido a{" "}
          <a
            href={`mailto:${TARGET_EMAIL}`}
            className="text-primary-700 underline"
          >
            {TARGET_EMAIL}
          </a>
          . El sitio no transmite ningún dato desde el servidor: la entrega la
          haces tú desde tu cliente.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Nombre"
          name="nombre"
          value={form.nombre}
          error={errors.nombre}
          onChange={update("nombre")}
          required
        />
        <Field
          label="Organización"
          name="organizacion"
          value={form.organizacion}
          error={errors.organizacion}
          onChange={update("organizacion")}
          required
        />
        <Field
          label="Cargo"
          name="cargo"
          value={form.cargo}
          error={errors.cargo}
          onChange={update("cargo")}
          required
        />
        <Field
          label="Email"
          name="email"
          value={form.email}
          error={errors.email}
          onChange={update("email")}
          type="email"
          required
        />

        <div className="md:col-span-2">
          <label
            htmlFor="interes"
            className="text-[12px] font-medium uppercase tracking-wide text-muted"
          >
            Interés
            <span className="ml-1 text-p1" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="interes"
            name="interes"
            value={form.interes}
            onChange={update("interes")}
            required
            aria-required="true"
            aria-invalid={errors.interes ? "true" : undefined}
            aria-describedby={errors.interes ? "interes-error" : undefined}
            className={`mt-2 h-11 w-full rounded-md border bg-surface px-3 text-[14px] text-ink outline-none focus:border-primary-700 ${
              errors.interes ? "border-p1" : "border-line"
            }`}
          >
            {intereses.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {errors.interes && (
            <p id="interes-error" className="mt-1 text-[12px] text-p1">
              {errors.interes}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="mensaje"
            className="text-[12px] font-medium uppercase tracking-wide text-muted"
          >
            Mensaje
            <span className="ml-1 text-p1" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            value={form.mensaje}
            onChange={update("mensaje")}
            placeholder="¿Qué sistemas tienes hoy? ¿Dónde se pierde el contexto? ¿Qué Outcome buscas?"
            required
            aria-required="true"
            aria-invalid={errors.mensaje ? "true" : undefined}
            aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
            className={`mt-2 w-full resize-none rounded-md border bg-surface p-3 text-[14px] text-ink outline-none placeholder:text-muted focus:border-primary-700 ${
              errors.mensaje ? "border-p1" : "border-line"
            }`}
          />
          {errors.mensaje && (
            <p id="mensaje-error" className="mt-1 text-[12px] text-p1">
              {errors.mensaje}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-muted">
          Tus datos se incluyen en el correo que armes en tu cliente; el sitio
          no los almacena.
        </p>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-700 px-5 text-[14px] font-medium text-primary-200 hover:bg-primary-800"
        >
          <Send size={14} />
          Enviar mensaje
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[12px] font-medium uppercase tracking-wide text-muted"
      >
        {label}
        {required && (
          <span className="ml-1 text-p1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        autoComplete={
          name === "email" ? "email" : name === "nombre" ? "name" : "off"
        }
        className={`mt-2 h-11 w-full rounded-md border bg-surface px-3 text-[14px] text-ink outline-none focus:border-primary-700 ${
          error ? "border-p1" : "border-line"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1 text-[12px] text-p1">
          {error}
        </p>
      )}
    </div>
  );
}
