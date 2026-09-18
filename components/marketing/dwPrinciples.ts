export type Principle = {
  id: string;
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    id: "DW-01",
    title: "System of Record & Conflict Governance",
    body: "Cada dominio es dueño de su dato. El ecosistema conecta y coordina; no pretende ser el system of record universal. Cuando hay conflictos entre fuentes, hay una política explícita que decide cuál gana, sin sorpresas.",
  },
  {
    id: "DW-02",
    title: "Decoupled Workflow Engine",
    body: "DeskFlow NO depende de n8n como runtime crítico. n8n puede ser un adapter de integración, pero el motor durable vive dentro del Core. Esto evita lock-in con una sola herramienta de orquestación.",
  },
  {
    id: "DW-03",
    title: "Durable Execution & Idempotency",
    body: "Los workflows son durables: si el operador se va a dormir o el proceso muere a mitad, retoma exactamente donde quedó. Y son idempotentes: ejecutarlos dos veces produce el mismo resultado.",
  },
  {
    id: "DW-04",
    title: "Lean Canonical Model",
    body: "El modelo canónico es mínimo y extensible. No inflamos entidades para parecer completos. Cada tabla, cada campo debe responder a un Outcome medible. Si no, no entra.",
  },
  {
    id: "DW-05",
    title: "Federated Authorization",
    body: "DeskHUB controla el contexto y la sesión; el sistema destino conserva su autorización. Pasamos identidad y permisos verificados; nunca replicamos reglas de autorización de un sistema en otro.",
  },
  {
    id: "DW-06",
    title: "Tiered Connector Governance",
    body: "Tres niveles de conector: certificados (soportados y auditados), asistidos (configuración con soporte del equipo) y self-managed (lo hace el cliente bajo su responsabilidad). La diferencia es legible antes de firmar.",
  },
  {
    id: "DW-07",
    title: "Contextual Workspace UX",
    body: "El usuario ve su trabajo, no la complejidad técnica. Las vistas se arman por contexto (qué estoy resolviendo, para quién, con qué prioridad) — no por la fuente de donde vienen los datos.",
  },
  {
    id: "DW-08",
    title: "Immutable Audit Ledger",
    body: "Toda acción relevante queda registrada en un ledger inmutable. El audit no se borra, no se reescribe, no se 'corrige en silencio'. Es la fuente de verdad sobre lo que pasó.",
  },
  {
    id: "DW-09",
    title: "Ecosystem Coexistence",
    body: "Integrar antes que sustituir. DeskHUB convive con tu stack actual. Si un conector no existe, no es razón para reemplazar el sistema; es razón para construirlo.",
  },
  {
    id: "DW-10",
    title: "Predictable Integration Economics",
    body: "El costo de integrar un sistema nuevo es legible antes de firmarlo. Sin tarifas sorpresa por evento, por conector o por seat. El modelo es predecible para que el cliente pueda planificar.",
  },
];