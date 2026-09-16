export type SectorId = "ong" | "pyme" | "operaciones" | "educacion";

export type Sector = {
  id: SectorId;
  tag: string;
  title: string;
  summary: string;
  tags: string[];
  challenges: string[];
  approach: string;
  outcomes: string[];
};

export const sectors: Sector[] = [
  {
    id: "ong",
    tag: "ONGs y fundaciones",
    title: "Voluntarios, regionales y presupuesto ajustado. El trabajo no para por cambios de planilla.",
    summary:
      "Operaciones distribuidas con alta rotación de voluntarios, equipos administrativos pequeños y muchos canales informales. La prioridad la pone quien grita más fuerte; el conocimiento se pierde cuando alguien se va.",
    tags: ["Voluntariado", "Regionales", "Multi-sede", "Presupuesto limitado"],
    challenges: [
      "Alta rotación de voluntarios y personal — el conocimiento operativo se va con ellos.",
      "Tickets atendidos por correo, formularios y canales informales mezclados.",
      "Una sola persona de TI atendiendo toda la organización, sin tiempo para sistematizar.",
      "Sedes regionales con necesidades distintas y poco margen para procesos únicos.",
      "Presupuesto limitado para licencias por usuario o por evento.",
    ],
    approach:
      "Inbox unificado (correo + web) que converge al mismo ticket. Prioridad calculada, no gritada. Asistente de 6 pasos para que el usuario no aprenda el sistema. Timer central y dashboards para que la única persona TI sepa dónde está la carga. Conocimiento que se queda en el audit ledger, no en la cabeza de nadie.",
    outcomes: [
      "Más capacidad operativa con el mismo equipo de soporte — sin contratar más gente.",
      "El conocimiento de cada resolución queda recuperable, no se pierde con quien se va.",
      "Las sedes regionales ven sus propios KPIs sin esperar un reporte central.",
      "El presupuesto se vuelve predecible: una plataforma, sin sorpresas por seat o evento.",
    ],
  },
  {
    id: "pyme",
    tag: "PYMEs en crecimiento",
    title: "5 a 50 personas, varios proveedores, un equipo TI pequeño que sostiene el mundo.",
    summary:
      "Equipos que crecieron rápido, contratos con 6 proveedores distintos, manuales que viven en Google Drive y nadie sabe quién es dueño de qué. El problema no es comprar más software; es no perder lo que ya funciona.",
    tags: ["Multi-proveedor", "Equipos híbridos", "Crecimiento rápido"],
    challenges: [
      "Stack fragmentado: CRM, ERP, helpdesk, comunicación y archivos en sistemas distintos.",
      "El paso de 'persona que sostenía todo' a equipo formal es doloroso.",
      "Datos duplicados entre sistemas: la misma oportunidad vive en 3 lugares.",
      "Decisiones tomadas en chat que nadie documenta después.",
      "Presupuesto para SaaS que crece sin control — nadie audita qué se usa.",
    ],
    approach:
      "DeskHUB se posiciona entre tus sistemas, no encima. Conectamos CRM, ERP, correo y archivos vía Desk Integration, sin migraciones traumáticas. DeskFlow mantiene la conversación: cuando algo cambia en un sistema, los demás se enteran. El audit ledger hace visibles las decisiones que antes se perdían en chat.",
    outcomes: [
      "Visibilidad real del estado de cada cliente/oportunidad, sin importar dónde viva.",
      "Reducción de licencias redundantes: pagas por lo que usas, no por inercia.",
      "Onboarding de nuevos empleados más rápido gracias al contexto recuperable.",
      "Decisiones documentadas y buscables, no enterradas en grupos de chat.",
    ],
  },
  {
    id: "operaciones",
    tag: "Operaciones distribuidas",
    title: "Sucursales, faenas, turnos. Los procesos deben correr aunque la red falle.",
    summary:
      "Operaciones con sucursales, faenas o turnos rotativos. La red no siempre está disponible; los procesos no pueden depender de una pantalla web abierta. Necesitan durabilidad, idempotencia y trazabilidad — aunque haya poca conectividad.",
    tags: ["Sucursales", "Faenas", "Turnos", "Conectividad intermitente"],
    challenges: [
      "Conectividad intermitente en faenas o sedes rurales.",
      "Procesos multi-paso que cruzan varios sistemas y personas.",
      "Cambios de turno: lo que dejó avanzado el operador anterior debe estar visible.",
      "Auditorías regulatorias que piden trazabilidad completa.",
      "Riesgo operacional cuando un paso se pierde entre planillas y mensajes.",
    ],
    approach:
      "DeskFlow ejecuta procesos durables e idempotentes: si la red cae, retoma donde quedó. La cola de tareas vive en DeskCore, no en la pantalla del operador. Cada acción queda en el audit ledger con timestamp, autor y contexto — listo para auditoría regulatoria.",
    outcomes: [
      "Procesos críticos corren completos aunque haya cortes de red.",
      "Cambios de turno sin pérdida de contexto: el siguiente operador ve exactamente dónde quedó.",
      "Trazabilidad completa para auditorías regulatorias.",
      "Reducción de errores por pasos manuales u olvidos entre turnos.",
    ],
  },
  {
    id: "educacion",
    tag: "Instituciones educativas",
    title: "Equipos administrativos, académicos y técnicos compartiendo infraestructura crítica.",
    summary:
      "Instituciones donde conviven áreas administrativas, académicas y técnicas con necesidades y ritmos distintos. Los sistemas suelen ser rígidos; los equipos necesitan flexibilidad sin perder el control institucional.",
    tags: ["Administrativo", "Académico", "Técnico", "Estacional"],
    challenges: [
      "Múltiples audiencias con vocabularios y expectativas distintas.",
      "Sistemas legacy institucionales costosos de reemplazar.",
      "Picos de actividad por ciclo académico (matrícula, evaluaciones, cierre).",
      "Coordinación entre áreas que no comparten herramientas.",
      "Presupuesto para infraestructura limitado frente a las necesidades.",
    ],
    approach:
      "DeskHUB convive con los sistemas legacy: los integra vía Desk Integration, no los reemplaza. Las vistas se arman por audiencia (administrativo, académico, técnico) con el mismo motor por debajo. Los picos estacionales se manejan con workflows durables que escalan sin contratar gente temporal.",
    outcomes: [
      "Misma plataforma, tres audiencias con experiencias adaptadas.",
      "Sistemas legacy aprovechados, no desechados — sin pérdida de inversión.",
      "Picos estacionales absorbidos sin crecer el equipo de soporte.",
      "Visibilidad institucional: rectoría ve el cuadro completo sin esperar reportes.",
    ],
  },
];