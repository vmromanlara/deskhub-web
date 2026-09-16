export type Priority = "P1" | "P2" | "P3" | "P4";
export type Status =
  | "Abierto"
  | "En proceso"
  | "Esperando usuario"
  | "Escalado"
  | "Resuelto"
  | "Cerrado";

export type Category =
  | "Computador"
  | "Correo"
  | "Internet"
  | "Impresora"
  | "Telefonía"
  | "Accesos"
  | "Software"
  | "Cuenta"
  | "Otro";

export interface Ticket {
  id: string;
  number: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: Category;
  requester: string;
  requesterRole: string;
  technician: string;
  createdAt: string;
  updatedAt: string;
  slaRemaining: string;
  comments: Array<{ author: string; role: string; body: string; at: string }>;
}

export const mockTickets: Ticket[] = [
  {
    id: "t-4821",
    number: 4821,
    title: "Impresora de oficina sin conexión",
    description:
      "La impresora del segundo piso no responde desde esta mañana. Los equipos muestran 'sin conexión' y la luz de red está apagada.",
    status: "En proceso",
    priority: "P2",
    category: "Impresora",
    requester: "Carolina Méndez",
    requesterRole: "Asistente administrativa",
    technician: "M. Pérez",
    createdAt: "Hoy · 09:14",
    updatedAt: "Hace 22 min",
    slaRemaining: "02:14:38",
    comments: [
      {
        author: "Carolina Méndez",
        role: "Solicitante",
        body: "Ya reinicié el equipo y revisé cables, sin cambios.",
        at: "09:18",
      },
      {
        author: "M. Pérez",
        role: "Soporte TI",
        body: "Reviso VLAN y dirección IP. Te aviso en 15 minutos.",
        at: "09:21",
      },
    ],
  },
  {
    id: "t-4820",
    number: 4820,
    title: "No puedo entrar al correo institucional",
    description:
      "Mi clave no es aceptada y al pedir restablecimiento nunca llega el correo. Trabajo con proveedores externos hoy.",
    status: "Abierto",
    priority: "P1",
    category: "Correo",
    requester: "Rodrigo Abarca",
    requesterRole: "Director regional",
    technician: "—",
    createdAt: "Hoy · 08:42",
    updatedAt: "Hace 1 h",
    slaRemaining: "00:31:05",
    comments: [],
  },
  {
    id: "t-4819",
    number: 4819,
    title: "Solicitud de acceso a sistema de reportes",
    description:
      "Necesito acceso al módulo de reportes mensuales. Mi jefa (Patricia Vidal) ya lo autorizó verbalmente.",
    status: "Esperando usuario",
    priority: "P3",
    category: "Accesos",
    requester: "Felipe Soto",
    requesterRole: "Analista",
    technician: "A. Rojas",
    createdAt: "Ayer · 17:08",
    updatedAt: "Hoy · 08:11",
    slaRemaining: "12:45:00",
    comments: [
      {
        author: "A. Rojas",
        role: "Soporte TI",
        body: "¿Me confirmas el módulo exacto? ¿Reportes ejecutivos o reportes operacionales?",
        at: "08:11",
      },
    ],
  },
  {
    id: "t-4818",
    number: 4818,
    title: "Equipo lento al abrir Excel",
    description:
      "Mi computador se demora más de 30 segundos en abrir archivos pesados. Antes lo hacía en 5.",
    status: "En proceso",
    priority: "P3",
    category: "Computador",
    requester: "Daniela Vargas",
    requesterRole: "Contadora",
    technician: "M. Pérez",
    createdAt: "Ayer · 14:22",
    updatedAt: "Hace 3 h",
    slaRemaining: "06:10:00",
    comments: [
      {
        author: "M. Pérez",
        role: "Soporte TI",
        body: "Voy a revisar el disco y la memoria. Te aviso.",
        at: "14:30",
      },
    ],
  },
  {
    id: "t-4817",
    number: 4817,
    title: "Internet intermitente en sala 4",
    description:
      "Varios equipos pierden la conexión varias veces por hora. Cableado OK según usuario.",
    status: "Escalado",
    priority: "P2",
    category: "Internet",
    requester: "Patricia Vidal",
    requesterRole: "Jefa de operaciones",
    technician: "Equipo de red",
    createdAt: "Ayer · 11:01",
    updatedAt: "Hace 30 min",
    slaRemaining: "01:55:21",
    comments: [
      {
        author: "M. Pérez",
        role: "Soporte TI",
        body: "Escalo a equipo de red. Detectamos intermitencia en el switch de la sala.",
        at: "11:10",
      },
    ],
  },
  {
    id: "t-4816",
    number: 4816,
    title: "Instalación de software de diseño",
    description:
      "Necesito instalar Figma y Adobe Illustrator para el nuevo proyecto de marca.",
    status: "Resuelto",
    priority: "P4",
    category: "Software",
    requester: "Camila Rojas",
    requesterRole: "Diseñadora",
    technician: "A. Rojas",
    createdAt: "Hace 2 días",
    updatedAt: "Ayer · 16:45",
    slaRemaining: "—",
    comments: [
      {
        author: "A. Rojas",
        role: "Soporte TI",
        body: "Instalado y verificado. Quedan 3 meses de licencia educativa.",
        at: "16:45",
      },
    ],
  },
];

export const statusColumnOrder: Status[] = [
  "Abierto",
  "En proceso",
  "Esperando usuario",
  "Escalado",
  "Resuelto",
];

export const statusBadgeClass: Record<Status, string> = {
  "Abierto": "bg-p1/15 text-p1 border-p1/30",
  "En proceso": "bg-p3/15 text-p3 border-p3/30",
  "Esperando usuario": "bg-secondary/10 text-secondary border-secondary/20",
  "Escalado": "bg-p2/15 text-p2 border-p2/30",
  "Resuelto": "bg-p4/15 text-p4 border-p4/30",
  "Cerrado": "bg-line text-muted border-line",
};

export const priorityBadgeClass: Record<Priority, string> = {
  P1: "bg-p1/15 text-p1 border-p1/30",
  P2: "bg-p2/15 text-p2 border-p2/30",
  P3: "bg-p3/15 text-p3 border-p3/30",
  P4: "bg-p4/15 text-p4 border-p4/30",
};

export const categoryOptions: ReadonlyArray<{ id: Category; label: string; hint: string }> = [
  { id: "Computador", label: "Computador", hint: "Equipo, hardware, rendimiento" },
  { id: "Correo", label: "Correo", hint: "Outlook, Gmail institucional" },
  { id: "Internet", label: "Internet / Conectividad", hint: "WiFi, cable, VPN" },
  { id: "Impresora", label: "Impresora", hint: "Tinta, atasco, drivers" },
  { id: "Telefonía", label: "Telefonía", hint: "Anexo, celular, softphone" },
  { id: "Accesos", label: "Accesos / Permisos", hint: "Sistemas, archivos, carpetas" },
  { id: "Software", label: "Software / Aplicaciones", hint: "Instalación, errores" },
  { id: "Cuenta", label: "Cuenta / Usuario", hint: "Alta, baja, contraseña" },
  { id: "Otro", label: "Otro", hint: "Si no encaja en las anteriores" },
];

export const kpis = [
  { label: "Tickets abiertos", value: "42", tone: "text-p1" },
  { label: "Resueltos hoy", value: "27", tone: "text-p4" },
  { label: "SLA en riesgo", value: "5", tone: "text-p2" },
  { label: "Primera respuesta", value: "12 min", tone: "text-ink" },
] as const;