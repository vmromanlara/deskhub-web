"use client";

import { useState } from "react";
import { CheckCircle2, Send, Beaker } from "lucide-react";

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

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const update =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [k]: e.target.value }));
      if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = errorsFrom(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-line bg-canvas p-8 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-p4/20 text-p4">
          <CheckCircle2 size={24} strokeWidth={2} />
        </div>
        <h2 className="mt-4 text-[22px] font-semibold tracking-tight">
          Gracias, {form.nombre.split(" ")[0]}.
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-secondary">
          Registramos tu mensaje. Te responderemos a{" "}
          <strong className="text-ink">{form.email}</strong> en menos de 48
          horas hábiles.
        </p>
        <p className="mt-3 text-[12px] text-muted">
          (Demo: este formulario no envía datos a ningún servidor.)
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
      <div className="mb-6 flex items-start gap-3 rounded-md border border-line bg-surface p-4">
        <Beaker size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-primary-700" />
        <p className="text-[12px] leading-relaxed text-secondary">
          <strong className="font-semibold text-ink">
            Modo preview.
          </strong>{" "}
          Este formulario es solo UI por ahora: valida localmente y simula un
          envío exitoso. En esta versión del sitio no se transmite a ningún
          backend. Para conversar de verdad, escríbenos a{" "}
          <a
            href="mailto:hola@deskhub.example.com"
            className="text-primary-700 underline"
          >
            hola@deskhub.example.com
          </a>
          .
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
          type="email"
          value={form.email}
          error={errors.email}
          onChange={update("email")}
          required
        />

        <div className="md:col-span-2">
          <label
            htmlFor="interes"
            className="text-[12px] font-medium uppercase tracking-wide text-muted"
          >
            Interés
          </label>
          <select
            id="interes"
            name="interes"
            value={form.interes}
            onChange={update("interes")}
            className="mt-2 h-11 w-full rounded-md border border-line bg-surface px-3 text-[14px] text-ink outline-none focus:border-primary-700"
          >
            {intereses.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="mensaje"
            className="text-[12px] font-medium uppercase tracking-wide text-muted"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            value={form.mensaje}
            onChange={update("mensaje")}
            placeholder="¿Qué sistemas tienes hoy? ¿Dónde se pierde el contexto? ¿Qué Outcome buscas?"
            className={`mt-2 w-full resize-none rounded-md border bg-surface p-3 text-[14px] text-ink outline-none placeholder:text-muted focus:border-primary-700 ${errors.mensaje ? "border-p1" : "border-line"}`}
          />
          {errors.mensaje && (
            <p className="mt-1 text-[12px] text-p1">{errors.mensaje}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-muted">
          Tus datos se usan solo para responder a esta consulta.
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
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[12px] font-medium uppercase tracking-wide text-muted"
      >
        {label}
        {required && <span className="ml-1 text-p1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={
          name === "email" ? "email" : name === "nombre" ? "name" : "off"
        }
        className={`mt-2 h-11 w-full rounded-md border bg-surface px-3 text-[14px] text-ink outline-none focus:border-primary-700 ${error ? "border-p1" : "border-line"}`}
      />
      {error && <p className="mt-1 text-[12px] text-p1">{error}</p>}
    </div>
  );
}