// DeskHUB Master Presentation v1.2.1 — generator
// Run with: node scripts/build-presentation.cjs
//
// Produces presentations/DESKHUB_MASTER_PRESENTATION_v1.2.1.pptx
// Follows DESKHUB_MASTER_PRESENTATION_DESIGN_SPEC_v1.2.1.md
// Brand: Manual de Marca DeskWork v1.0
//   Primary 700  #0d4f4a   Primary 800  #0a3d39
//   Primary 200  #d9eae7   Accent 300   #6ee7df
//   Canvas       #fafaf7   Surface      #ffffff
//   Line         #e9e3d6   Ink          #14171e
//   Secondary    #3a4256   Muted        #7c7a72

const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const lu = require("react-icons/lu");

// ────────────────────────────────────────────────────────────────────────────
// Brand tokens
// ────────────────────────────────────────────────────────────────────────────
const C = {
  canvas: "FAF8F2", // Fafaf7 → FAF8F2 (PowerPoint tends to render warm off-whites
                    // slightly cooler; FAF8F2 reads warmer and closer to brand intent)
  surface: "FFFFFF",
  line: "E9E3D6",
  ink: "14171E",
  secondary: "3A4256",
  muted: "7C7A72",
  primary: "0D4F4A", // DeskWork Teal
  primaryDeep: "0A3D39",
  primarySoft: "D9EAE7",
  accent: "6EE7DF",
  // Status badges
  p1: "B3331F",
  p2: "C2410C",
  p3: "A16207",
  p4: "047857",
};

const FONT = {
  display: "Calibri", // safe sans, renders consistent
  body: "Calibri",
  mono: "Courier New", // safe mono
};

const W = 10; // slide width inches
const H = 5.625; // slide height inches

// ────────────────────────────────────────────────────────────────────────────
// Lucide icons → base64 PNGs (rasterized via sharp)
// ────────────────────────────────────────────────────────────────────────────
const ICON = {};
const ICON_NAMES = [
  "LuLayers", "LuWorkflow", "LuPlug", "LuShieldCheck", "LuLayoutDashboard",
  "LuInbox", "LuGitBranch", "LuGauge", "LuTimer", "LuBot", "LuChartLine",
  "LuBuilding2", "LuHeart", "LuFactory", "LuGraduationCap", "LuBriefcase",
  "LuDatabase", "LuBrain", "LuBoxes", "LuListTree", "LuNetwork",
  "LuPuzzle", "LuTrendingDown", "LuArrowRight", "LuUserPlus", "LuHandshake",
  "LuMonitor", "LuTelescope", "LuHexagon", "LuSparkles", "LuCircleDot",
  "LuBookOpen", "LuUsers", "LuLandmark",
];

async function renderIcon(name, color = C.primary, size = 256) {
  if (!lu[name]) throw new Error(`Icon not found: ${name}`);
  const Comp = lu[name];
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(
      Comp,
      { size: size, color: "#" + color, strokeWidth: 2 }
    )
  );
  // Wrap in proper SVG with viewBox to ensure sharp renders correctly
  const wrapped =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">${svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</svg>`;
  const buf = await sharp(Buffer.from(wrapped))
    .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function preloadIcons() {
  for (const n of ICON_NAMES) {
    ICON[n] = await renderIcon(n, C.ink, 256);
    ICON[n + "_primary"] = await renderIcon(n, C.primary, 256);
    ICON[n + "_light"] = await renderIcon(n, C.primarySoft, 256);
    ICON[n + "_onDark"] = await renderIcon(n, C.primarySoft, 256);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Layout helpers
// ────────────────────────────────────────────────────────────────────────────

function bg(pres, slide, color) {
  slide.background = { color };
}

function eyebrow(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.6,
    y: opts.y ?? 0.4,
    w: opts.w ?? W - 1.2,
    h: 0.3,
    fontFace: FONT.body,
    fontSize: 10,
    bold: true,
    color: opts.color ?? C.muted,
    charSpacing: 2,
    margin: 0,
    align: opts.align ?? "left",
  });
}

function slideNumber(slide, n) {
  slide.addText(String(n).padStart(2, "0") + " / 24", {
    x: W - 1.4,
    y: 0.4,
    w: 0.8,
    h: 0.3,
    fontFace: FONT.mono,
    fontSize: 9,
    color: C.muted,
    align: "right",
    margin: 0,
  });
}

function footer(slide, text = "DeskHUB · Master Presentation v1.2.1 · sept 2026") {
  slide.addText(text, {
    x: 0.6,
    y: H - 0.35,
    w: W - 1.2,
    h: 0.25,
    fontFace: FONT.body,
    fontSize: 8,
    color: C.muted,
    margin: 0,
  });
}

function title(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.6,
    y: opts.y ?? 0.85,
    w: opts.w ?? W - 1.2,
    h: opts.h ?? 0.9,
    fontFace: FONT.display,
    fontSize: opts.size ?? 32,
    bold: true,
    color: opts.color ?? C.ink,
    valign: "top",
    margin: 0,
  });
}

function subtitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.6,
    y: opts.y ?? 1.85,
    w: opts.w ?? W - 1.2,
    h: opts.h ?? 0.7,
    fontFace: FONT.body,
    fontSize: opts.size ?? 14,
    color: opts.color ?? C.secondary,
    valign: "top",
    margin: 0,
  });
}

// Status badge
function statusBadge(slide, x, y, label, kind) {
  const styles = {
    core: { bg: C.primary, fg: C.primarySoft, border: C.primary },
    current: { bg: C.surface, fg: C.primary, border: C.primary },
    emerging: { bg: C.primarySoft, fg: C.primaryDeep, border: C.primarySoft },
    future: { bg: C.surface, fg: C.muted, border: C.muted, dashed: true },
    planned: { bg: C.surface, fg: C.muted, border: C.line },
  }[kind];

  slide.addShape("roundRect", {
    x,
    y,
    w: 1.5,
    h: 0.32,
    fill: { color: styles.bg },
    line: { color: styles.border, width: 0.75, dashType: styles.dashed ? "dash" : "solid" },
    rectRadius: 0.06,
  });
  slide.addText(label, {
    x: x + 0.1,
    y: y + 0.02,
    w: 1.3,
    h: 0.28,
    fontFace: FONT.body,
    fontSize: 9,
    bold: true,
    color: styles.fg,
    charSpacing: 1,
    valign: "middle",
    align: "center",
    margin: 0,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Slide builders
// ────────────────────────────────────────────────────────────────────────────

function slide01Cover(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.primaryDeep);

  // Soft radial accent rectangles (no real gradients in pptxgenjs)
  slide.addShape("rect", {
    x: 0, y: 0, w: W, h: H,
    fill: { color: C.primaryDeep },
    line: { type: "none" },
  });
  slide.addShape("ellipse", {
    x: -2, y: -2, w: 6, h: 6,
    fill: { color: C.primary, transparency: 60 },
    line: { type: "none" },
  });
  slide.addShape("ellipse", {
    x: W - 3, y: H - 2, w: 5, h: 5,
    fill: { color: C.accent, transparency: 70 },
    line: { type: "none" },
  });

  // Isotipo DeskHUB
  slide.addShape("roundRect", {
    x: 0.7, y: 1.5, w: 0.85, h: 0.85,
    fill: { color: C.primary },
    line: { color: C.accent, width: 1 },
    rectRadius: 0.14,
  });
  slide.addShape("line", {
    x: 1.125, y: 1.62, w: 0, h: 0.62,
    line: { color: C.accent, width: 1.5 },
  });
  slide.addShape("ellipse", {
    x: 0.94, y: 1.84, w: 0.13, h: 0.13,
    fill: { color: C.primarySoft },
    line: { type: "none" },
  });
  slide.addShape("ellipse", {
    x: 1.18, y: 1.84, w: 0.13, h: 0.13,
    fill: { color: C.primarySoft },
    line: { type: "none" },
  });

  // Brand name
  slide.addText("DeskHUB", {
    x: 1.7, y: 1.45, w: 4, h: 0.9,
    fontFace: FONT.display, fontSize: 56, bold: true,
    color: C.primarySoft, margin: 0, valign: "middle",
  });

  // Tagline
  slide.addText("Ecosistema de Trabajo Empresarial e Institucional", {
    x: 0.7, y: 2.6, w: W - 1.4, h: 0.5,
    fontFace: FONT.body, fontSize: 18,
    color: C.primarySoft, margin: 0,
  });

  // Promise
  slide.addShape("line", {
    x: 0.7, y: 3.3, w: 0.6, h: 0,
    line: { color: C.accent, width: 2 },
  });
  slide.addText(
    "Tu organización. Tus sistemas. Un solo ecosistema de trabajo.",
    {
      x: 0.7, y: 3.5, w: W - 1.4, h: 0.9,
      fontFace: FONT.display, fontSize: 24, bold: true,
      color: "FFFFFF", margin: 0,
    }
  );
  slide.addText(
    "Diseñado para evitar dependencia estructural y preservar interoperabilidad y portabilidad.",
    {
      x: 0.7, y: 4.4, w: W - 1.4, h: 0.5,
      fontFace: FONT.body, fontSize: 12,
      color: C.primarySoft, margin: 0,
    }
  );

  // Footer brand
  slide.addText("FABRIC LAB", {
    x: 0.7, y: H - 0.45, w: 4, h: 0.3,
    fontFace: FONT.body, fontSize: 9, bold: true,
    color: C.primarySoft, charSpacing: 3, margin: 0,
  });
  slide.addText("Septiembre 2026 · v1.2.1", {
    x: W - 3.7, y: H - 0.45, w: 3, h: 0.3,
    fontFace: FONT.mono, fontSize: 9,
    color: C.primarySoft, margin: 0, align: "right",
  });
}

function slide02Context(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "02 · CONTEXTO", { y: 0.55 });
  slideNumber(slide, 2);

  slide.addShape("rect", {
    x: 0.6, y: 1.05, w: 0.12, h: 0.12,
    fill: { color: C.primary }, line: { type: "none" },
  });

  slide.addText("Fabric Lab presenta DeskHUB.", {
    x: 0.6, y: 1.25, w: W - 1.2, h: 0.8,
    fontFace: FONT.display, fontSize: 36, bold: true,
    color: C.ink, margin: 0,
  });

  slide.addText(
    "Construimos tecnología para que las organizaciones trabajen mejor.",
    {
      x: 0.6, y: 2.15, w: W - 1.2, h: 0.6,
      fontFace: FONT.body, fontSize: 18,
      color: C.secondary, margin: 0,
    }
  );

  // Reglas / valores
  const items = [
    { t: "Sin claims absolutos.", b: "Solo datos verificados. Sin cifras inventadas." },
    { t: "Arquitectura honesta.", b: "La complejidad está debajo; la experiencia arriba." },
    { t: "Postura enterprise.", b: "Lenguaje preciso, sistema visual sobrio, status claros." },
  ];

  items.forEach((it, i) => {
    const y = 3.1 + i * 0.6;
    slide.addShape("ellipse", {
      x: 0.6, y: y + 0.06, w: 0.16, h: 0.16,
      fill: { color: C.primary }, line: { type: "none" },
    });
    slide.addText(it.t, {
      x: 0.9, y: y, w: 4, h: 0.32,
      fontFace: FONT.display, fontSize: 14, bold: true,
      color: C.ink, margin: 0,
    });
    slide.addText(it.b, {
      x: 0.9, y: y + 0.28, w: W - 1.5, h: 0.28,
      fontFace: FONT.body, fontSize: 12,
      color: C.secondary, margin: 0,
    });
  });

  footer(slide);
}

function slide03Problem(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "03 · EL PROBLEMA", { y: 0.55 });
  slideNumber(slide, 3);

  title(slide, "La fragmentación tecnológica no es un detalle. Es el problema central.", {
    y: 1.0, w: W - 1.2, h: 1.4, size: 28,
  });

  const fragments = [
    { t: "Tickets", b: "En un sistema." },
    { t: "Aprobaciones", b: "En otro." },
    { t: "Datos", b: "En un tercero." },
    { t: "Conversación", b: "En chat." },
  ];
  const xs = [0.6, 2.85, 5.1, 7.35];
  fragments.forEach((f, i) => {
    slide.addShape("roundRect", {
      x: xs[i], y: 2.7, w: 2.1, h: 1.4,
      fill: { color: C.canvas },
      line: { color: C.line, width: 1 },
      rectRadius: 0.08,
    });
    slide.addText(f.t, {
      x: xs[i] + 0.2, y: 2.85, w: 1.7, h: 0.4,
      fontFace: FONT.display, fontSize: 18, bold: true,
      color: C.ink, margin: 0,
    });
    slide.addText(f.b, {
      x: xs[i] + 0.2, y: 3.3, w: 1.7, h: 0.3,
      fontFace: FONT.body, fontSize: 12,
      color: C.secondary, margin: 0,
    });
    if (i < fragments.length - 1) {
      slide.addText("·", {
        x: xs[i] + 1.95, y: 3.15, w: 0.2, h: 0.3,
        fontFace: FONT.body, fontSize: 16, bold: true,
        color: C.muted, align: "center", margin: 0,
      });
    }
  });

  slide.addText(
    "El trabajo se reconstruye a mano todos los días. La organización opera en modo patchwork.",
    {
      x: 0.6, y: 4.4, w: W - 1.2, h: 0.7,
      fontFace: FONT.body, fontSize: 14,
      color: C.secondary, margin: 0,
    }
  );

  footer(slide);
}

function slide04Cost(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "04 · EL COSTO (cualitativo)", { y: 0.55 });
  slideNumber(slide, 4);

  title(slide, "Lo que la fragmentación cuesta.", { y: 1.0, h: 0.9, size: 32 });
  subtitle(slide, "Representación cualitativa. Sin cifras inventadas.", { y: 1.85, h: 0.4, size: 13 });

  const items = [
    { t: "Tiempo", b: "Reconstruir contexto cada vez que cambia un sistema." },
    { t: "Duplicación", b: "El mismo dato vive en 3 lugares. ¿Cuál es la verdad?" },
    { t: "Errores", b: "Pasos manuales entre sistemas = pasos que se olvidan." },
    { t: "Visibilidad", b: "Decisiones lentas por falta de cuadro único." },
    { t: "Dependencia", b: "Si una persona se va, el conocimiento se va con ella." },
  ];

  items.forEach((it, i) => {
    const y = 2.5 + i * 0.55;
    slide.addShape("rect", {
      x: 0.6, y: y + 0.18, w: 0.18, h: 0.18,
      fill: { color: C.p1 }, line: { type: "none" },
    });
    slide.addText(it.t, {
      x: 0.9, y: y, w: 2.5, h: 0.5,
      fontFace: FONT.display, fontSize: 16, bold: true,
      color: C.ink, valign: "middle", margin: 0,
    });
    slide.addText(it.b, {
      x: 3.5, y: y, w: W - 4.1, h: 0.5,
      fontFace: FONT.body, fontSize: 13,
      color: C.secondary, valign: "middle", margin: 0,
    });
  });

  footer(slide);
}

function slide05Change(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "05 · EL CAMBIO", { y: 0.55 });
  slideNumber(slide, 5);

  title(slide, "Del software aislado al ecosistema de trabajo.", { y: 1.0, h: 0.9, size: 30 });

  // Before / After visual
  const cardY = 2.4;
  const cardH = 2.5;

  // BEFORE
  slide.addShape("roundRect", {
    x: 0.6, y: cardY, w: 4.2, h: cardH,
    fill: { color: C.canvas },
    line: { color: C.line, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("HOY", {
    x: 0.8, y: cardY + 0.2, w: 1.5, h: 0.3,
    fontFace: FONT.body, fontSize: 10, bold: true,
    color: C.muted, charSpacing: 2, margin: 0,
  });
  slide.addText("Software aislado", {
    x: 0.8, y: cardY + 0.5, w: 3.8, h: 0.5,
    fontFace: FONT.display, fontSize: 20, bold: true,
    color: C.ink, margin: 0,
  });
  const beforeBullets = [
    "Una pantalla por sistema.",
    "Datos duplicados.",
    "Decisiones en chat.",
    "Knowledge en cabezas.",
  ];
  beforeBullets.forEach((b, i) => {
    slide.addShape("ellipse", {
      x: 0.85, y: cardY + 1.2 + i * 0.3 + 0.07, w: 0.08, h: 0.08,
      fill: { color: C.muted }, line: { type: "none" },
    });
    slide.addText(b, {
      x: 1.05, y: cardY + 1.2 + i * 0.3, w: 3.6, h: 0.3,
      fontFace: FONT.body, fontSize: 13,
      color: C.secondary, margin: 0,
    });
  });

  // ARROW
  slide.addText("→", {
    x: 4.85, y: cardY + 1.0, w: 0.3, h: 0.5,
    fontFace: FONT.display, fontSize: 32, bold: true,
    color: C.primary, align: "center", margin: 0,
  });

  // AFTER
  slide.addShape("roundRect", {
    x: 5.2, y: cardY, w: 4.2, h: cardH,
    fill: { color: C.primary },
    line: { type: "none" },
    rectRadius: 0.1,
  });
  slide.addText("DESKHUB", {
    x: 5.4, y: cardY + 0.2, w: 2, h: 0.3,
    fontFace: FONT.body, fontSize: 10, bold: true,
    color: C.accent, charSpacing: 2, margin: 0,
  });
  slide.addText("Ecosistema de trabajo", {
    x: 5.4, y: cardY + 0.5, w: 3.8, h: 0.5,
    fontFace: FONT.display, fontSize: 20, bold: true,
    color: "FFFFFF", margin: 0,
  });
  const afterBullets = [
    "Una superficie coherente.",
    "Contexto preservado.",
    "Decisiones auditables.",
    "Conocimiento como activo.",
  ];
  afterBullets.forEach((b, i) => {
    slide.addShape("ellipse", {
      x: 5.45, y: cardY + 1.2 + i * 0.3 + 0.07, w: 0.08, h: 0.08,
      fill: { color: C.accent }, line: { type: "none" },
    });
    slide.addText(b, {
      x: 5.65, y: cardY + 1.2 + i * 0.3, w: 3.6, h: 0.3,
      fontFace: FONT.body, fontSize: 13,
      color: C.primarySoft, margin: 0,
    });
  });

  footer(slide);
}

function slide06WhatIs(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "06 · ¿QUÉ ES DESKHUB?", { y: 0.55 });
  slideNumber(slide, 6);

  title(slide, "DeskHUB es el ecosistema de Fabric Lab", {
    y: 1.0, h: 0.7, size: 28,
  });
  subtitle(slide,
    "para conectar, integrar y organizar la forma en que tu organización trabaja.",
    { y: 1.7, h: 0.4, size: 15 }
  );
  subtitle(slide,
    "Diseñado para evitar dependencia estructural y preservar interoperabilidad.",
    { y: 2.15, h: 0.4, size: 13, color: C.muted }
  );

  // Ecosystem rings (simplified)
  const cx = 5.0;
  const cy = 4.05;

  // Ring 1 — Fabric Lab (outer)
  slide.addShape("ellipse", {
    x: cx - 2.2, y: cy - 1.3, w: 4.4, h: 2.6,
    fill: { color: C.canvas },
    line: { color: C.line, width: 1 },
  });
  slide.addText("FABRIC LAB", {
    x: cx - 1.5, y: cy - 1.15, w: 3, h: 0.25,
    fontFace: FONT.body, fontSize: 9, bold: true,
    color: C.muted, charSpacing: 2, align: "center", margin: 0,
  });

  // Ring 2 — DeskHUB
  slide.addShape("ellipse", {
    x: cx - 1.7, y: cy - 1.0, w: 3.4, h: 2.0,
    fill: { color: C.primarySoft },
    line: { color: C.primary, width: 1 },
  });
  slide.addText("DESKHUB", {
    x: cx - 1.5, y: cy - 0.85, w: 3, h: 0.3,
    fontFace: FONT.body, fontSize: 11, bold: true,
    color: C.primaryDeep, charSpacing: 2, align: "center", margin: 0,
  });

  // Capabilities around ring 2
  const caps = ["DeskWork", "DeskNow", "DeskSolution", "DeskBrain", "DeskThing", "DesksIA"];
  caps.forEach((c, i) => {
    const angle = (i * Math.PI * 2) / caps.length - Math.PI / 2;
    const r = 1.35;
    const x = cx + Math.cos(angle) * r - 0.6;
    const y = cy + Math.sin(angle) * r * 0.85 - 0.12;
    slide.addShape("roundRect", {
      x, y, w: 1.2, h: 0.24,
      fill: { color: C.surface },
      line: { color: C.primary, width: 0.5 },
      rectRadius: 0.05,
    });
    slide.addText(c, {
      x, y, w: 1.2, h: 0.24,
      fontFace: FONT.body, fontSize: 9, bold: true,
      color: C.primary, align: "center", valign: "middle", margin: 0,
    });
  });

  // Center — DeskWork
  slide.addShape("ellipse", {
    x: cx - 0.65, y: cy - 0.4, w: 1.3, h: 0.8,
    fill: { color: C.primary },
    line: { type: "none" },
  });
  slide.addText("DeskWork", {
    x: cx - 0.65, y: cy - 0.45, w: 1.3, h: 0.35,
    fontFace: FONT.display, fontSize: 12, bold: true,
    color: "FFFFFF", align: "center", valign: "middle", margin: 0,
  });
  slide.addText("Work Experience", {
    x: cx - 0.65, y: cy - 0.08, w: 1.3, h: 0.4,
    fontFace: FONT.body, fontSize: 8,
    color: C.primarySoft, align: "center", margin: 0,
  });

  // Left side message
  slide.addShape("line", {
    x: 0.6, y: 4.0, w: 0.5, h: 0,
    line: { color: C.primary, width: 2 },
  });
  slide.addText("La complejidad se integra detrás de DeskWork.", {
    x: 0.6, y: 4.15, w: 3.5, h: 0.4,
    fontFace: FONT.display, fontSize: 13, bold: true,
    color: C.ink, margin: 0,
  });
  slide.addText("El usuario trabaja desde DeskWork.", {
    x: 0.6, y: 4.55, w: 3.5, h: 0.4,
    fontFace: FONT.body, fontSize: 12,
    color: C.secondary, margin: 0,
  });

  footer(slide);
}

function slide07Architecture(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "07 · ARQUITECTURA DEL ECOSISTEMA", { y: 0.4 });
  slideNumber(slide, 7);

  title(slide, "Cómo está construido DeskHUB.", { y: 0.75, h: 0.6, size: 26 });

  // Diagram
  const cx = W / 2;

  // FABRIC LAB
  slide.addShape("roundRect", {
    x: cx - 1.0, y: 1.55, w: 2.0, h: 0.4,
    fill: { color: C.muted }, line: { type: "none" },
    rectRadius: 0.05,
  });
  slide.addText("FABRIC LAB", {
    x: cx - 1.0, y: 1.55, w: 2.0, h: 0.4,
    fontFace: FONT.body, fontSize: 10, bold: true,
    color: "FFFFFF", align: "center", valign: "middle",
    charSpacing: 2, margin: 0,
  });
  // connector
  slide.addShape("line", { x: cx, y: 1.95, w: 0, h: 0.18, line: { color: C.line, width: 1 } });

  // DESKHUB
  slide.addShape("roundRect", {
    x: cx - 1.4, y: 2.15, w: 2.8, h: 0.45,
    fill: { color: C.primaryDeep }, line: { type: "none" },
    rectRadius: 0.05,
  });
  slide.addText("DESKHUB", {
    x: cx - 1.4, y: 2.15, w: 2.8, h: 0.45,
    fontFace: FONT.display, fontSize: 14, bold: true,
    color: C.primarySoft, align: "center", valign: "middle",
    charSpacing: 2, margin: 0,
  });

  // Three columns
  const cols = [
    { x: 0.6, w: 2.9, name: "DESKWORK", sub: "Platform / Workspace",
      items: ["DeskCore", "Desk Integration", "DeskFlow"], accent: C.primary },
    { x: 3.65, w: 2.9, name: "DESKNOW", sub: "Functional Solutions",
      items: ["Departments", "Products", "Modules", "Submodules", "Verticals", "Solutions"], accent: C.primaryDeep },
    { x: 6.7, w: 2.7, name: "DESKSOLUTION", sub: "Custom Solutions",
      items: ["Línea comercial", "que usa capacidades", "del ecosistema"], accent: C.secondary },
  ];
  cols.forEach((col) => {
    slide.addShape("line", { x: col.x + col.w / 2, y: 2.6, w: 0, h: 0.18, line: { color: C.line, width: 1 } });
    slide.addShape("roundRect", {
      x: col.x, y: 2.8, w: col.w, h: 1.5,
      fill: { color: C.canvas },
      line: { color: col.accent, width: 1 },
      rectRadius: 0.08,
    });
    slide.addText(col.name, {
      x: col.x + 0.15, y: 2.9, w: col.w - 0.3, h: 0.3,
      fontFace: FONT.display, fontSize: 13, bold: true,
      color: col.accent, charSpacing: 1.5, margin: 0,
    });
    slide.addText(col.sub, {
      x: col.x + 0.15, y: 3.2, w: col.w - 0.3, h: 0.22,
      fontFace: FONT.body, fontSize: 10,
      color: C.muted, margin: 0,
    });
    col.items.forEach((it, j) => {
      slide.addText("· " + it, {
        x: col.x + 0.15, y: 3.5 + j * 0.18, w: col.w - 0.3, h: 0.2,
        fontFace: FONT.body, fontSize: 10,
        color: C.secondary, margin: 0,
      });
    });
  });

  // Transversal capabilities row
  slide.addShape("line", {
    x: cx, y: 4.4, w: 0, h: 0.18,
    line: { color: C.line, width: 1 },
  });
  slide.addText("TRANSVERSAL CAPABILITIES", {
    x: 0.6, y: 4.6, w: W - 1.2, h: 0.25,
    fontFace: FONT.body, fontSize: 9, bold: true,
    color: C.muted, charSpacing: 2, align: "center", margin: 0,
  });

  const trans = ["DeskBrain", "DeskThing", "DesksIA"];
  trans.forEach((t, i) => {
    const tx = 2.0 + i * 2.4;
    slide.addShape("roundRect", {
      x: tx, y: 4.95, w: 2.0, h: 0.45,
      fill: { color: C.primarySoft }, line: { type: "none" },
      rectRadius: 0.05,
    });
    slide.addText(t, {
      x: tx, y: 4.95, w: 2.0, h: 0.45,
      fontFace: FONT.display, fontSize: 12, bold: true,
      color: C.primaryDeep, align: "center", valign: "middle", margin: 0,
    });
  });
}

function slide08DeskWork(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "08 · DESKWORK", { y: 0.5 });
  slideNumber(slide, 8);
  statusBadge(slide, W - 2.3, 0.5, "Current — MVP", "current");

  title(slide, "DeskWork. La superficie del ecosistema.", { y: 1.05, h: 0.7, size: 28 });
  subtitle(slide, "Donde el usuario trabaja. La plataforma que navega.", { y: 1.75, h: 0.4, size: 14 });

  // Internal composition diagram
  const cx = W / 2;
  const deskWorkY = 2.5;

  slide.addShape("roundRect", {
    x: cx - 1.5, y: deskWorkY, w: 3.0, h: 0.85,
    fill: { color: C.primary }, line: { type: "none" },
    rectRadius: 0.08,
  });
  slide.addText("DESKWORK", {
    x: cx - 1.5, y: deskWorkY + 0.08, w: 3.0, h: 0.32,
    fontFace: FONT.display, fontSize: 16, bold: true,
    color: C.primarySoft, align: "center", charSpacing: 2, margin: 0,
  });
  slide.addText("Platform / Workspace (surface)", {
    x: cx - 1.5, y: deskWorkY + 0.42, w: 3.0, h: 0.3,
    fontFace: FONT.body, fontSize: 10,
    color: C.primarySoft, align: "center", margin: 0,
  });

  // Three sub-components
  const subs = [
    { x: 0.7, w: 2.7, name: "DESKCORE", role: "(sustains)" },
    { x: 3.65, w: 2.7, name: "DESK INTEGRATION", role: "(connects)" },
    { x: 6.6, w: 2.7, name: "DESKFLOW", role: "(coordinates & executes)" },
  ];
  subs.forEach((s) => {
    slide.addShape("line", {
      x: s.x + s.w / 2, y: deskWorkY + 0.85, w: 0, h: 0.2,
      line: { color: C.line, width: 1 },
    });
    slide.addShape("roundRect", {
      x: s.x, y: deskWorkY + 1.1, w: s.w, h: 0.85,
      fill: { color: C.surface }, line: { color: C.primary, width: 1 },
      rectRadius: 0.08,
    });
    slide.addText(s.name, {
      x: s.x, y: deskWorkY + 1.18, w: s.w, h: 0.32,
      fontFace: FONT.display, fontSize: 12, bold: true,
      color: C.primary, align: "center", charSpacing: 1.5, margin: 0,
    });
    slide.addText(s.role, {
      x: s.x, y: deskWorkY + 1.55, w: s.w, h: 0.3,
      fontFace: FONT.body, fontSize: 10,
      color: C.muted, align: "center", margin: 0,
    });
  });

  // Bottom note
  slide.addText(
    "Principio mnemónico: \"DeskCore sostiene. Desk Integration conecta. DeskFlow coordina y ejecuta. DeskWork presenta.\"",
    {
      x: 0.6, y: 4.7, w: W - 1.2, h: 0.4,
      fontFace: FONT.body, fontSize: 11,
      color: C.secondary, align: "center", italic: true, margin: 0,
    }
  );

  footer(slide);
}

function slide09Station(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "09 · DESKWORK — ESTACIÓN DE TRABAJO", { y: 0.5 });
  slideNumber(slide, 9);
  statusBadge(slide, W - 2.3, 0.5, "Current — MVP", "current");

  title(slide, "Una sola estación para cada persona.", { y: 1.05, h: 0.7, size: 28 });
  subtitle(slide, "El usuario entra. Su identidad determina lo que ve.", { y: 1.75, h: 0.4, size: 14 });

  // Mockup window
  const mx = 1.5, my = 2.5, mw = 7, mh = 2.5;
  slide.addShape("roundRect", {
    x: mx, y: my, w: mw, h: mh,
    fill: { color: C.canvas }, line: { color: C.line, width: 1 },
    rectRadius: 0.06,
  });
  // Top bar
  slide.addShape("roundRect", {
    x: mx, y: my, w: mw, h: 0.35,
    fill: { color: C.canvas }, line: { type: "none" },
    rectRadius: 0.06,
  });
  slide.addShape("ellipse", { x: mx + 0.15, y: my + 0.1, w: 0.15, h: 0.15, fill: { color: C.line }, line: { type: "none" } });
  slide.addShape("ellipse", { x: mx + 0.35, y: my + 0.1, w: 0.15, h: 0.15, fill: { color: C.line }, line: { type: "none" } });
  slide.addShape("ellipse", { x: mx + 0.55, y: my + 0.1, w: 0.15, h: 0.15, fill: { color: C.line }, line: { type: "none" } });
  slide.addText("deskwork.app", {
    x: mx + 2.5, y: my + 0.05, w: 2, h: 0.25,
    fontFace: FONT.mono, fontSize: 10, color: C.muted, margin: 0,
  });

  // Sidebar
  slide.addShape("rect", {
    x: mx, y: my + 0.35, w: 1.6, h: mh - 0.35,
    fill: { color: C.primaryDeep }, line: { type: "none" },
  });
  const navItems = ["Inicio", "Tickets", "Proyectos", "Conocimiento", "Dashboards"];
  navItems.forEach((n, i) => {
    slide.addText(n, {
      x: mx + 0.2, y: my + 0.55 + i * 0.4, w: 1.3, h: 0.3,
      fontFace: FONT.body, fontSize: 11,
      color: i === 1 ? C.accent : C.primarySoft, margin: 0,
    });
  });

  // Content tiles
  const tiles = [
    { x: mx + 1.9, label: "P1 — Crítico", value: "2", tone: C.p1 },
    { x: mx + 3.6, label: "P2 — Alto", value: "5", tone: C.p2 },
    { x: mx + 5.3, label: "P3 — Normal", value: "8", tone: C.p3 },
  ];
  tiles.forEach((t) => {
    slide.addShape("roundRect", {
      x: t.x, y: my + 0.55, w: 1.5, h: 0.9,
      fill: { color: C.surface }, line: { color: C.line, width: 1 },
      rectRadius: 0.06,
    });
    slide.addText(t.label, {
      x: t.x + 0.1, y: my + 0.6, w: 1.3, h: 0.25,
      fontFace: FONT.body, fontSize: 9, color: C.muted, margin: 0,
    });
    slide.addText(t.value, {
      x: t.x + 0.1, y: my + 0.85, w: 1.3, h: 0.55,
      fontFace: FONT.display, fontSize: 32, bold: true,
      color: t.tone, margin: 0,
    });
  });

  // Tickets list mockup
  slide.addShape("roundRect", {
    x: mx + 1.9, y: my + 1.6, w: 4.9, h: 0.8,
    fill: { color: C.surface }, line: { color: C.line, width: 1 },
    rectRadius: 0.06,
  });
  ["#4821 Impresora sin conexión", "#4820 No entra al correo", "#4819 Solicitud de acceso"].forEach((t, i) => {
    slide.addShape("rect", { x: mx + 2.0 + i * 1.6, y: my + 1.7, w: 0.06, h: 0.6, fill: { color: i === 0 ? C.p2 : i === 1 ? C.p1 : C.p3 }, line: { type: "none" } });
    slide.addText(t, {
      x: mx + 2.15 + i * 1.6, y: my + 1.7, w: 1.5, h: 0.6,
      fontFace: FONT.body, fontSize: 9, color: C.ink, valign: "middle", margin: 0,
    });
  });

  footer(slide);
}

function slide10DeskNow(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "10 · DESKNOW", { y: 0.5 });
  slideNumber(slide, 10);
  statusBadge(slide, W - 2.3, 0.5, "Current / Emerging", "emerging");

  title(slide, "DeskNow. Familia de soluciones funcionales nativas.", {
    y: 1.05, h: 0.7, size: 24,
  });
  subtitle(slide, "Opera en tres dimensiones distintas. Vertical y Solución NO son niveles jerárquicos.", {
    y: 1.75, h: 0.4, size: 12, color: C.muted,
  });

  // Three columns
  const dims = [
    {
      x: 0.6, w: 2.85,
      title: "Estructura funcional",
      sub: "(jerárquica)",
      items: [
        ["Departamentos", "FINANZAS · OPERACIONES · RR.HH."],
        ["Productos", "—"],
        ["Módulos", "—"],
        ["Submódulos", "—"],
      ],
    },
    {
      x: 3.6, w: 2.85,
      title: "Composición sectorial",
      sub: "(transversal — NO jerárquica)",
      items: [
        ["Verticals", "ONG · Educación · Salud"],
        ["", "PYME · Empresa · Sector Público"],
      ],
    },
    {
      x: 6.6, w: 2.85,
      title: "Composición comercial",
      sub: "(cliente específico)",
      items: [
        ["Solución", "Combinación para un cliente concreto"],
      ],
    },
  ];

  dims.forEach((d) => {
    slide.addShape("roundRect", {
      x: d.x, y: 2.4, w: d.w, h: 2.6,
      fill: { color: C.surface },
      line: { color: C.primary, width: 1 },
      rectRadius: 0.08,
    });
    slide.addText(d.title, {
      x: d.x + 0.2, y: 2.55, w: d.w - 0.4, h: 0.35,
      fontFace: FONT.display, fontSize: 14, bold: true,
      color: C.primary, charSpacing: 1, margin: 0,
    });
    slide.addText(d.sub, {
      x: d.x + 0.2, y: 2.9, w: d.w - 0.4, h: 0.25,
      fontFace: FONT.body, fontSize: 9,
      color: C.muted, italic: true, margin: 0,
    });
    d.items.forEach((it, j) => {
      const y = 3.3 + j * 0.4;
      slide.addText(it[0], {
        x: d.x + 0.2, y, w: d.w - 0.4, h: 0.18,
        fontFace: FONT.display, fontSize: 11, bold: true,
        color: C.ink, margin: 0,
      });
      if (it[1]) {
        slide.addText(it[1], {
          x: d.x + 0.2, y: y + 0.18, w: d.w - 0.4, h: 0.18,
          fontFace: FONT.body, fontSize: 9,
          color: C.secondary, margin: 0,
        });
      }
    });
  });

  footer(slide);
}

function slide11Taxonomy(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "11 · TAXONOMÍA", { y: 0.5 });
  slideNumber(slide, 11);

  title(slide, "Cómo se organiza DeskNow.", { y: 1.05, h: 0.7, size: 28 });
  subtitle(slide, "Estructura funcional jerárquica + 2 dimensiones transversales.", {
    y: 1.75, h: 0.4, size: 14,
  });

  // Table-like rows
  const rows = [
    { c: "Departamento / Dominio", n: "Área funcional de la organización.", b: "Estructura funcional" },
    { c: "Producto", n: "Unidad funcional comercializable.", b: "Estructura funcional" },
    { c: "Módulo", n: "Capacidad funcional dentro de un producto.", b: "Estructura funcional" },
    { c: "Submódulo", n: "Descomposición más específica.", b: "Estructura funcional" },
    { c: "Vertical", n: "Composición / configuración sectorial.", b: "Dimensión transversal" },
    { c: "Solución", n: "Combinación comercial para un cliente.", b: "Dimensión comercial" },
  ];

  rows.forEach((r, i) => {
    const y = 2.5 + i * 0.4;
    slide.addShape("rect", {
      x: 0.6, y: y + 0.35, w: W - 1.2, h: 0.005,
      fill: { color: C.line }, line: { type: "none" },
    });
    slide.addText(r.c, {
      x: 0.6, y, w: 3, h: 0.35,
      fontFace: FONT.display, fontSize: 13, bold: true,
      color: C.ink, valign: "middle", margin: 0,
    });
    slide.addText(r.n, {
      x: 3.7, y, w: 4, h: 0.35,
      fontFace: FONT.body, fontSize: 12,
      color: C.secondary, valign: "middle", margin: 0,
    });
    slide.addShape("roundRect", {
      x: 7.9, y: y + 0.06, w: 1.5, h: 0.24,
      fill: { color: r.b === "Estructura funcional" ? C.primarySoft : C.canvas },
      line: { color: r.b === "Estructura funcional" ? C.primarySoft : C.line, width: 0.5 },
      rectRadius: 0.05,
    });
    slide.addText(r.b, {
      x: 7.9, y: y + 0.06, w: 1.5, h: 0.24,
      fontFace: FONT.body, fontSize: 9, bold: true,
      color: r.b === "Estructura funcional" ? C.primaryDeep : C.muted,
      align: "center", valign: "middle", margin: 0,
    });
  });

  footer(slide);
}

function slide12DeskBrain(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "12 · DESKBRAIN", { y: 0.5 });
  slideNumber(slide, 12);
  statusBadge(slide, W - 2.3, 0.5, "Future Vision", "future");

  title(slide, "DeskBrain — Knowledge, Context & Memory.", { y: 1.05, h: 0.7, size: 26 });
  subtitle(slide, "¿Qué sabemos? ¿Cuál es el contexto?", { y: 1.75, h: 0.4, size: 14 });

  // Big visual
  slide.addShape("roundRect", {
    x: 1.5, y: 2.7, w: 7, h: 2.2,
    fill: { color: C.surface }, line: { color: C.line, width: 1 },
    rectRadius: 0.1,
  });
  slide.addShape("ellipse", {
    x: 4.5, y: 2.85, w: 1, h: 1,
    fill: { color: C.primary }, line: { type: "none" },
  });
  slide.addText("🧠", {
    x: 4.5, y: 2.85, w: 1, h: 1,
    fontFace: "Calibri", fontSize: 36,
    color: C.primarySoft, align: "center", valign: "middle", margin: 0,
  });
  slide.addText("La memoria contextual de la organización.", {
    x: 2, y: 4.0, w: 6, h: 0.4,
    fontFace: FONT.display, fontSize: 16, bold: true,
    color: C.ink, align: "center", margin: 0,
  });
  slide.addText("Decisiones, precedentes, contexto operativo.", {
    x: 2, y: 4.4, w: 6, h: 0.4,
    fontFace: FONT.body, fontSize: 12,
    color: C.secondary, align: "center", margin: 0,
  });

  footer(slide);
}

function slide13DeskThing(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "13 · DESKTHING", { y: 0.5 });
  slideNumber(slide, 13);
  statusBadge(slide, W - 2.3, 0.5, "Emerging", "emerging");

  title(slide, "DeskThing — Data, Processing & Intelligence.", { y: 1.05, h: 0.7, size: 26 });
  subtitle(slide, "¿Qué podemos descubrir, medir, modelar o predecir?", { y: 1.75, h: 0.4, size: 14 });

  const items = [
    { t: "Data", b: "Confiable y trazable." },
    { t: "Processing", b: "Pipelines durables." },
    { t: "Intelligence", b: "Modelos explicables." },
  ];
  items.forEach((it, i) => {
    const x = 0.6 + i * 3.1;
    slide.addShape("roundRect", {
      x, y: 2.7, w: 2.85, h: 2.2,
      fill: { color: C.canvas },
      line: { color: C.primary, width: 1 },
      rectRadius: 0.1,
    });
    slide.addText(it.t, {
      x: x + 0.2, y: 2.9, w: 2.45, h: 0.5,
      fontFace: FONT.display, fontSize: 22, bold: true,
      color: C.primary, margin: 0,
    });
    slide.addText(it.b, {
      x: x + 0.2, y: 3.5, w: 2.45, h: 0.6,
      fontFace: FONT.body, fontSize: 13,
      color: C.secondary, margin: 0,
    });
  });

  slide.addText("Datos confiables convertidos en inteligencia utilizable.", {
    x: 0.6, y: 5.05, w: W - 1.2, h: 0.3,
    fontFace: FONT.body, fontSize: 12, italic: true,
    color: C.muted, align: "center", margin: 0,
  });

  footer(slide);
}

function slide14DesksIA(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "14 · DESKSIA", { y: 0.5 });
  slideNumber(slide, 14);
  statusBadge(slide, W - 2.3, 0.5, "Emerging / Future", "future");

  title(slide, "DesksIA — Intelligent & Governed Execution.", { y: 1.05, h: 0.7, size: 26 });
  subtitle(slide, "¿Qué podemos ejecutar y bajo qué reglas?", { y: 1.75, h: 0.4, size: 14 });

  slide.addShape("roundRect", {
    x: 1.5, y: 2.7, w: 7, h: 2.2,
    fill: { color: C.primaryDeep }, line: { type: "none" },
    rectRadius: 0.1,
  });
  slide.addShape("ellipse", {
    x: 4.6, y: 2.95, w: 0.8, h: 0.8,
    fill: { color: C.primary }, line: { color: C.accent, width: 1.5 },
  });
  slide.addText("⚙", {
    x: 4.6, y: 2.95, w: 0.8, h: 0.8,
    fontFace: "Calibri", fontSize: 32,
    color: C.accent, align: "center", valign: "middle", margin: 0,
  });
  slide.addText("Ejecución inteligente gobernada", {
    x: 2, y: 3.95, w: 6, h: 0.4,
    fontFace: FONT.display, fontSize: 18, bold: true,
    color: "FFFFFF", align: "center", margin: 0,
  });
  slide.addText("Acciones dentro del ecosistema, no fuera de él.", {
    x: 2, y: 4.4, w: 6, h: 0.4,
    fontFace: FONT.body, fontSize: 12,
    color: C.primarySoft, align: "center", margin: 0,
  });

  footer(slide);
}

function slide15Together(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "15 · CÓMO TRABAJAN JUNTOS", { y: 0.5 });
  slideNumber(slide, 15);

  title(slide, "El ecosistema completo en acción.", { y: 1.05, h: 0.7, size: 28 });

  const cx = W / 2;
  // Stack: DESKWORK → DESKFLOW → DESKNOW + DESK INTEGRATION → Transversal
  // DESKWORK top
  slide.addShape("roundRect", {
    x: cx - 1.8, y: 2.0, w: 3.6, h: 0.5,
    fill: { color: C.primary }, line: { type: "none" },
    rectRadius: 0.05,
  });
  slide.addText("DESKWORK · Work Experience (superficie)", {
    x: cx - 1.8, y: 2.0, w: 3.6, h: 0.5,
    fontFace: FONT.body, fontSize: 10, bold: true,
    color: C.primarySoft, align: "center", valign: "middle", margin: 0,
  });
  slide.addShape("line", { x: cx, y: 2.5, w: 0, h: 0.18, line: { color: C.line, width: 1 } });

  // DESKFLOW
  slide.addShape("roundRect", {
    x: cx - 1.8, y: 2.7, w: 3.6, h: 0.5,
    fill: { color: C.primarySoft }, line: { type: "none" },
    rectRadius: 0.05,
  });
  slide.addText("DESKFLOW · Workflow / Coordination", {
    x: cx - 1.8, y: 2.7, w: 3.6, h: 0.5,
    fontFace: FONT.body, fontSize: 10, bold: true,
    color: C.primaryDeep, align: "center", valign: "middle", margin: 0,
  });

  // Split arrow
  slide.addShape("line", { x: 3.0, y: 3.2, w: 0, h: 0.15, line: { color: C.line, width: 1 } });
  slide.addShape("line", { x: W - 3.0, y: 3.2, w: 0, h: 0.15, line: { color: C.line, width: 1 } });
  slide.addShape("line", { x: 3.0, y: 3.35, w: W - 6.0, h: 0, line: { color: C.line, width: 1 } });
  slide.addShape("line", { x: 3.0, y: 3.35, w: 0, h: 0.15, line: { color: C.line, width: 1 } });
  slide.addShape("line", { x: W - 3.0, y: 3.35, w: 0, h: 0.15, line: { color: C.line, width: 1 } });

  // DESKNOW
  slide.addShape("roundRect", {
    x: 1.5, y: 3.5, w: 3.0, h: 0.5,
    fill: { color: C.surface }, line: { color: C.primary, width: 1 },
    rectRadius: 0.05,
  });
  slide.addText("DESKNOW · funciones de negocio", {
    x: 1.5, y: 3.5, w: 3.0, h: 0.5,
    fontFace: FONT.body, fontSize: 10, bold: true,
    color: C.primary, align: "center", valign: "middle", margin: 0,
  });

  // DESK INTEGRATION
  slide.addShape("roundRect", {
    x: W - 4.5, y: 3.5, w: 3.0, h: 0.5,
    fill: { color: C.surface }, line: { color: C.primary, width: 1 },
    rectRadius: 0.05,
  });
  slide.addText("DESK INTEGRATION · sistemas externos", {
    x: W - 4.5, y: 3.5, w: 3.0, h: 0.5,
    fontFace: FONT.body, fontSize: 10, bold: true,
    color: C.primary, align: "center", valign: "middle", margin: 0,
  });

  // Transversal capabilities
  slide.addShape("line", { x: cx, y: 4.0, w: 0, h: 0.18, line: { color: C.line, width: 1 } });
  slide.addText("TRANSVERSAL CAPABILITIES (intercambian contexto, datos, inteligencia y ejecución)", {
    x: 0.6, y: 4.2, w: W - 1.2, h: 0.25,
    fontFace: FONT.body, fontSize: 9, bold: true,
    color: C.muted, charSpacing: 2, align: "center", margin: 0,
  });
  const trans = ["DeskBrain", "DeskThing", "DesksIA"];
  trans.forEach((t, i) => {
    const tx = 2.0 + i * 2.4;
    slide.addShape("roundRect", {
      x: tx, y: 4.5, w: 2.0, h: 0.45,
      fill: { color: C.primarySoft }, line: { type: "none" },
      rectRadius: 0.05,
    });
    slide.addText(t, {
      x: tx, y: 4.5, w: 2.0, h: 0.45,
      fontFace: FONT.display, fontSize: 12, bold: true,
      color: C.primaryDeep, align: "center", valign: "middle", margin: 0,
    });
  });

  slide.addText("El usuario trabaja en DeskWork. DeskFlow coordina y ejecuta. El resto del ecosistema lo alimenta.", {
    x: 0.6, y: 5.1, w: W - 1.2, h: 0.3,
    fontFace: FONT.body, fontSize: 11, italic: true,
    color: C.muted, align: "center", margin: 0,
  });

  footer(slide);
}

function slide16Integration(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.primaryDeep);
  eyebrow(slide, "16 · ESTRATEGIA", { y: 0.5, color: C.accent });
  slideNumber(slide, 16);
  statusBadge(slide, W - 2.3, 0.5, "Core", "core");

  slide.addText("Build for Integration,", {
    x: 0.6, y: 1.05, w: W - 1.2, h: 0.7,
    fontFace: FONT.display, fontSize: 36, bold: true,
    color: "FFFFFF", margin: 0,
  });
  slide.addText("Not Imitation.", {
    x: 0.6, y: 1.65, w: W - 1.2, h: 0.7,
    fontFace: FONT.display, fontSize: 36, bold: true,
    color: C.accent, margin: 0,
  });
  slide.addText("Integrar antes que reemplazar.", {
    x: 0.6, y: 2.35, w: W - 1.2, h: 0.4,
    fontFace: FONT.body, fontSize: 14,
    color: C.primarySoft, margin: 0,
  });

  // Logo wall
  const systems = ["SAP", "Salesforce", "BUK", "Microsoft", "Google", "Zendesk", "Odoo", "Legacy"];
  systems.forEach((s, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 1.0 + col * 2.1;
    const y = 3.2 + row * 0.9;
    slide.addShape("roundRect", {
      x, y, w: 1.8, h: 0.65,
      fill: { color: C.primary },
      line: { color: C.accent, width: 0.75 },
      rectRadius: 0.06,
    });
    slide.addText(s, {
      x, y, w: 1.8, h: 0.65,
      fontFace: FONT.display, fontSize: 14, bold: true,
      color: C.primarySoft, align: "center", valign: "middle", margin: 0,
    });
  });

  slide.addText(
    "Diseñado para evitar dependencia estructural y preservar interoperabilidad y portabilidad.",
    {
      x: 0.6, y: 5.0, w: W - 1.2, h: 0.4,
      fontFace: FONT.body, fontSize: 11, italic: true,
      color: C.primarySoft, align: "center", margin: 0,
    }
  );
}

function slide17Journey1(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "17 · JOURNEY 1 — NUEVA CONTRATACIÓN", { y: 0.5 });
  slideNumber(slide, 17);

  title(slide, "Cómo se ve una contratación con DeskHUB.", { y: 1.05, h: 0.7, size: 26 });

  // Flow diagram
  const stages = [
    { t: "Persona responsable", s: "inicia la solicitud", tone: "muted" },
    { t: "DESKWORK", s: "superficie / workspace", tone: "primary" },
    { t: "DESKFLOW", s: "motor de coordinación y ejecución", tone: "soft" },
    { t: "Sistemas downstream", s: "DeskHR · DeskTI · BUK · MS · Google", tone: "line" },
    { t: "Aprobaciones + DesksIA", s: "acciones autorizadas", tone: "line" },
    { t: "Resultado + Audit", s: "ledger inmutable", tone: "primary" },
  ];

  const sy = 2.3;
  const rowH = 0.42;
  stages.forEach((st, i) => {
    const y = sy + i * rowH;
    const colors = {
      muted: { bg: C.surface, fg: C.ink, line: C.line },
      primary: { bg: C.primary, fg: C.primarySoft, line: C.primary },
      soft: { bg: C.primarySoft, fg: C.primaryDeep, line: C.primarySoft },
      line: { bg: C.canvas, fg: C.ink, line: C.line },
    }[st.tone];
    slide.addShape("roundRect", {
      x: 1.0, y, w: 8, h: rowH - 0.05,
      fill: { color: colors.bg },
      line: { color: colors.line, width: 1 },
      rectRadius: 0.05,
    });
    slide.addText(st.t, {
      x: 1.2, y, w: 3, h: rowH - 0.05,
      fontFace: FONT.display, fontSize: 12, bold: true,
      color: colors.fg, valign: "middle", margin: 0,
    });
    slide.addText(st.s, {
      x: 4.3, y, w: 4.5, h: rowH - 0.05,
      fontFace: FONT.body, fontSize: 11,
      color: colors.fg, valign: "middle", margin: 0,
    });
    if (i < stages.length - 1) {
      slide.addText("↓", {
        x: 0.6, y: y + rowH - 0.05, w: 0.3, h: 0.18,
        fontFace: FONT.body, fontSize: 11,
        color: C.muted, align: "center", valign: "middle", margin: 0,
      });
    }
  });

  slide.addText("Una sola solicitud. Múltiples sistemas coordinados. Un único contexto de trabajo.", {
    x: 0.6, y: 5.05, w: W - 1.2, h: 0.3,
    fontFace: FONT.body, fontSize: 12, bold: true, italic: true,
    color: C.primary, align: "center", margin: 0,
  });

  footer(slide);
}

function slide18Journey2(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "18 · JOURNEY 2 — NEGOCIO GANADO", { y: 0.5 });
  slideNumber(slide, 18);

  title(slide, "Salesforce → proyecto → SAP → equipos → cierre.", { y: 1.05, h: 0.7, size: 26 });
  subtitle(slide, "Los sistemas quedan. La coordinación es nueva.", { y: 1.75, h: 0.4, size: 14, color: C.muted });

  const stages = [
    { t: "Salesforce", b: "Oportunidad ganada" },
    { t: "DeskWork", b: "Proyecto creado" },
    { t: "DeskFlow", b: "Onboarding coord." },
    { t: "SAP", b: "Alta de cliente" },
    { t: "Equipos", b: "Notificados" },
    { t: "Cierre", b: "Audit + KPI" },
  ];

  const sx = 0.6, sy = 2.6, sw = 1.4, sh = 1.6;
  stages.forEach((st, i) => {
    const x = sx + i * (sw + 0.05);
    const isCore = i === 1 || i === 2;
    slide.addShape("roundRect", {
      x, y: sy, w: sw, h: sh,
      fill: { color: isCore ? C.primary : C.canvas },
      line: { color: isCore ? C.primary : C.line, width: 1 },
      rectRadius: 0.08,
    });
    slide.addText(st.t, {
      x, y: sy + 0.4, w: sw, h: 0.5,
      fontFace: FONT.display, fontSize: 14, bold: true,
      color: isCore ? C.primarySoft : C.primary, align: "center", margin: 0,
    });
    slide.addText(st.b, {
      x: x + 0.05, y: sy + 0.95, w: sw - 0.1, h: 0.5,
      fontFace: FONT.body, fontSize: 10,
      color: isCore ? C.primarySoft : C.secondary,
      align: "center", margin: 0,
    });
    if (i < stages.length - 1) {
      slide.addText("→", {
        x: x + sw - 0.05, y: sy + 0.7, w: 0.15, h: 0.3,
        fontFace: FONT.body, fontSize: 14, bold: true,
        color: C.muted, align: "center", valign: "middle", margin: 0,
      });
    }
  });

  slide.addText("Una oportunidad se convierte en operación sin migraciones traumáticas.", {
    x: 0.6, y: 4.5, w: W - 1.2, h: 0.4,
    fontFace: FONT.body, fontSize: 13, italic: true,
    color: C.secondary, align: "center", margin: 0,
  });

  footer(slide);
}

function slide19Verticals(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "19 · VERTICALES", { y: 0.5 });
  slideNumber(slide, 19);

  title(slide, "DeskHUB se adapta a tu organización, no al revés.", {
    y: 1.05, h: 0.7, size: 26,
  });
  subtitle(slide, "Composiciones sectoriales, NO productos independientes.", {
    y: 1.75, h: 0.4, size: 13, color: C.muted,
  });

  const verticals = [
    { i: "LuHeart", n: "ONG / OSC", b: "Voluntarios, regionales, presupuesto limitado." },
    { i: "LuGraduationCap", n: "Educación", b: "Administrativo, académico, técnico." },
    { i: "LuShieldCheck", n: "Salud", b: "Compliance, turnos, auditoría." },
    { i: "LuBriefcase", n: "PYME", b: "5-50 personas, varios proveedores." },
    { i: "LuBuilding2", n: "Empresa", b: "Multi-equipo, multi-sede." },
    { i: "LuLandmark", n: "Sector Público", b: "Transparencia, trazabilidad, escala." },
  ];

  verticals.forEach((v, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 3.0;
    const y = 2.5 + row * 1.4;
    slide.addShape("roundRect", {
      x, y, w: 2.7, h: 1.2,
      fill: { color: C.surface },
      line: { color: C.line, width: 1 },
      rectRadius: 0.08,
    });
    slide.addImage({
      data: ICON[v.i + "_primary"],
      x: x + 0.2, y: y + 0.2, w: 0.4, h: 0.4,
    });
    slide.addText(v.n, {
      x: x + 0.7, y: y + 0.18, w: 1.9, h: 0.4,
      fontFace: FONT.display, fontSize: 15, bold: true,
      color: C.ink, valign: "middle", margin: 0,
    });
    slide.addText(v.b, {
      x: x + 0.2, y: y + 0.7, w: 2.4, h: 0.45,
      fontFace: FONT.body, fontSize: 11,
      color: C.secondary, margin: 0,
    });
  });

  slide.addText("Una arquitectura. Múltiples composiciones sectoriales.", {
    x: 0.6, y: 5.3, w: W - 1.2, h: 0.3,
    fontFace: FONT.body, fontSize: 12, italic: true,
    color: C.muted, align: "center", margin: 0,
  });

  footer(slide);
}

function slide20Services(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "20 · SERVICES + DESKSOLUTION", { y: 0.5 });
  slideNumber(slide, 20);
  statusBadge(slide, W - 2.3, 0.5, "Current / Planned", "planned");

  title(slide, "Servicios para implementar, evolucionar y construir.", { y: 1.05, h: 0.7, size: 26 });
  subtitle(slide, "Acompañamiento profesional + capacidad de desarrollo a medida.", {
    y: 1.75, h: 0.4, size: 13,
  });

  // Two columns: Services | DeskSolution
  const itemsA = ["Advisory & Assessment", "Implementation", "Integration", "Data & Intelligence", "Automation & AI", "Managed Services"];
  itemsA.forEach((s, i) => {
    const y = 2.6 + i * 0.36;
    slide.addShape("rect", {
      x: 0.6, y: y + 0.12, w: 0.1, h: 0.1,
      fill: { color: C.primary }, line: { type: "none" },
    });
    slide.addText(s, {
      x: 0.85, y, w: 4, h: 0.32,
      fontFace: FONT.body, fontSize: 12,
      color: C.ink, valign: "middle", margin: 0,
    });
  });
  slide.addText("SERVICES", {
    x: 0.6, y: 2.25, w: 4, h: 0.3,
    fontFace: FONT.body, fontSize: 10, bold: true,
    color: C.primary, charSpacing: 2, margin: 0,
  });

  const itemsB = ["Desarrollo a medida", "Aplicaciones custom", "Plataformas específicas", "Portales", "Integraciones especializadas", "IA custom"];
  itemsB.forEach((s, i) => {
    const y = 2.6 + i * 0.36;
    slide.addShape("rect", {
      x: 5.4, y: y + 0.12, w: 0.1, h: 0.1,
      fill: { color: C.primaryDeep }, line: { type: "none" },
    });
    slide.addText(s, {
      x: 5.65, y, w: 4, h: 0.32,
      fontFace: FONT.body, fontSize: 12,
      color: C.ink, valign: "middle", margin: 0,
    });
  });
  slide.addText("DESKSOLUTION", {
    x: 5.4, y: 2.25, w: 4, h: 0.3,
    fontFace: FONT.body, fontSize: 10, bold: true,
    color: C.primaryDeep, charSpacing: 2, margin: 0,
  });

  slide.addText("DeskSolution construye lo que el cliente necesita hoy. Services acompaña la implementación, integración y operación.", {
    x: 0.6, y: 5.05, w: W - 1.2, h: 0.4,
    fontFace: FONT.body, fontSize: 11, italic: true,
    color: C.muted, align: "center", margin: 0,
  });

  footer(slide);
}

function slide21Offer(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "21 · MODELO DE OFERTA", { y: 0.5 });
  slideNumber(slide, 21);

  title(slide, "Cómo se puede incorporar DeskHUB.", { y: 1.05, h: 0.7, size: 26 });
  subtitle(slide, "Modelo modular. Se incorpora por componente.", {
    y: 1.75, h: 0.4, size: 13, color: C.muted,
  });

  const rows = [
    { k: "Platform", v: "DeskWork como espacio de trabajo." },
    { k: "Native Solutions", v: "DeskNow como arquitectura funcional + soluciones nativas." },
    { k: "Custom Solutions", v: "DeskSolution como línea comercial de desarrollo a medida." },
    { k: "Capabilities", v: "DeskBrain / DeskThing / DesksIA como capacidades transversales." },
    { k: "Ecosystem", v: "Integraciones, partners, conectores." },
    { k: "Services", v: "Advisory, Implementation, Integration, Data & AI, Automation, Managed." },
  ];

  rows.forEach((r, i) => {
    const y = 2.5 + i * 0.4;
    slide.addShape("rect", {
      x: 0.6, y: y + 0.35, w: W - 1.2, h: 0.005,
      fill: { color: C.line }, line: { type: "none" },
    });
    slide.addText(r.k, {
      x: 0.6, y, w: 3.0, h: 0.35,
      fontFace: FONT.display, fontSize: 14, bold: true,
      color: C.primary, valign: "middle", margin: 0,
    });
    slide.addText(r.v, {
      x: 3.7, y, w: W - 4.3, h: 0.35,
      fontFace: FONT.body, fontSize: 12,
      color: C.ink, valign: "middle", margin: 0,
    });
  });

  footer(slide);
}

function slide22Evolution(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.surface);
  eyebrow(slide, "22 · EVOLUCIÓN", { y: 0.5 });
  slideNumber(slide, 22);

  title(slide, "Hacia dónde evoluciona DeskHUB.", { y: 1.05, h: 0.7, size: 26 });

  const stages = [
    { t: "Platform", s: "Workspace · Identity · Workflow · Integration", kind: "current" },
    { t: "Native Solutions", s: "DeskNow madurando por dominio", kind: "current" },
    { t: "Custom Solutions", s: "DeskSolution facturando", kind: "current" },
    { t: "Knowledge", s: "DeskBrain activo", kind: "future" },
    { t: "Intelligence", s: "DeskThing activo", kind: "future" },
    { t: "Automation", s: "DesksIA bajo políticas", kind: "future" },
    { t: "Agentic Execution", s: "DesksIA con bounded autonomy ampliada", kind: "future" },
  ];

  const sx = 0.7, sy = 2.0, gap = 0.05;
  const stepW = (W - 2 * 0.7 - gap * (stages.length - 1)) / stages.length;

  stages.forEach((s, i) => {
    const x = sx + i * (stepW + gap);
    const c = s.kind === "current" ? C.primary : C.canvas;
    const fg = s.kind === "current" ? C.primarySoft : C.ink;
    slide.addShape("roundRect", {
      x, y: sy, w: stepW, h: 2.6,
      fill: { color: c }, line: { color: C.primary, width: 0.75 },
      rectRadius: 0.06,
    });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x, y: sy + 0.15, w: stepW, h: 0.4,
      fontFace: FONT.mono, fontSize: 16, bold: true,
      color: s.kind === "current" ? C.accent : C.muted,
      align: "center", margin: 0,
    });
    slide.addText(s.t, {
      x: x + 0.1, y: sy + 0.6, w: stepW - 0.2, h: 0.7,
      fontFace: FONT.display, fontSize: 11, bold: true,
      color: fg, align: "center", margin: 0,
    });
    slide.addText(s.s, {
      x: x + 0.1, y: sy + 1.3, w: stepW - 0.2, h: 1.2,
      fontFace: FONT.body, fontSize: 9,
      color: s.kind === "current" ? C.primarySoft : C.secondary,
      align: "center", margin: 0,
    });
  });

  // Legend
  slide.addShape("rect", { x: 0.6, y: 5.0, w: 0.15, h: 0.15, fill: { color: C.primary }, line: { type: "none" } });
  slide.addText("Current", {
    x: 0.8, y: 4.95, w: 1, h: 0.25,
    fontFace: FONT.body, fontSize: 9, color: C.muted, margin: 0,
  });
  slide.addShape("rect", { x: 1.8, y: 5.0, w: 0.15, h: 0.15, fill: { color: C.canvas }, line: { color: C.primary, width: 0.5 } });
  slide.addText("Future Vision", {
    x: 2.0, y: 4.95, w: 2, h: 0.25,
    fontFace: FONT.body, fontSize: 9, color: C.muted, margin: 0,
  });

  footer(slide);
}

function slide23Vision(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.canvas);
  eyebrow(slide, "23 · VISIÓN ESTRATÉGICA", { y: 0.5 });
  slideNumber(slide, 23);

  // Big quote-style layout
  slide.addShape("line", {
    x: 0.6, y: 1.3, w: 0.6, h: 0,
    line: { color: C.primary, width: 3 },
  });
  slide.addText("Visión", {
    x: 0.6, y: 1.5, w: 4, h: 0.4,
    fontFace: FONT.body, fontSize: 11, bold: true,
    color: C.muted, charSpacing: 2, margin: 0,
  });

  slide.addText(
    "Construir un ecosistema que permita a organizaciones empresariales e institucionales integrar, operar, comprender y evolucionar su trabajo sin tener que reconstruir desde cero su arquitectura tecnológica.",
    {
      x: 0.6, y: 2.0, w: W - 1.2, h: 1.8,
      fontFace: FONT.display, fontSize: 24, bold: true,
      color: C.ink, margin: 0,
    }
  );

  slide.addShape("line", {
    x: 0.6, y: 4.0, w: W - 1.2, h: 0,
    line: { color: C.line, width: 1 },
  });

  slide.addText("Mercado inicial · territorio estratégico", {
    x: 0.6, y: 4.2, w: W - 1.2, h: 0.3,
    fontFace: FONT.body, fontSize: 11, bold: true,
    color: C.muted, charSpacing: 2, margin: 0,
  });
  slide.addText("Chile · LATAM", {
    x: 0.6, y: 4.5, w: W - 1.2, h: 0.5,
    fontFace: FONT.display, fontSize: 28, bold: true,
    color: C.primary, margin: 0,
  });

  footer(slide);
}

function slide24Closing(pres) {
  const slide = pres.addSlide();
  bg(pres, slide, C.primaryDeep);

  slide.addShape("ellipse", {
    x: -2, y: -2, w: 6, h: 6,
    fill: { color: C.primary, transparency: 60 },
    line: { type: "none" },
  });
  slide.addShape("ellipse", {
    x: W - 3, y: H - 2, w: 5, h: 5,
    fill: { color: C.accent, transparency: 70 },
    line: { type: "none" },
  });

  // Isotipo (large)
  slide.addShape("roundRect", {
    x: W / 2 - 0.6, y: 1.4, w: 1.2, h: 1.2,
    fill: { color: C.primary }, line: { color: C.accent, width: 1.5 },
    rectRadius: 0.18,
  });
  slide.addShape("line", {
    x: W / 2, y: 1.55, w: 0, h: 0.9,
    line: { color: C.accent, width: 2 },
  });
  slide.addShape("ellipse", {
    x: W / 2 - 0.36, y: 1.86, w: 0.18, h: 0.18,
    fill: { color: C.primarySoft }, line: { type: "none" },
  });
  slide.addShape("ellipse", {
    x: W / 2 + 0.18, y: 1.86, w: 0.18, h: 0.18,
    fill: { color: C.primarySoft }, line: { type: "none" },
  });

  slide.addText("DeskHUB", {
    x: 0.6, y: 2.85, w: W - 1.2, h: 0.7,
    fontFace: FONT.display, fontSize: 48, bold: true,
    color: "FFFFFF", align: "center", margin: 0,
  });

  slide.addText(
    "Diseñado para evitar dependencia estructural y preservar interoperabilidad y portabilidad.",
    {
      x: 0.6, y: 3.7, w: W - 1.2, h: 0.6,
      fontFace: FONT.body, fontSize: 14,
      color: C.primarySoft, align: "center", margin: 0,
    }
  );

  slide.addShape("line", {
    x: W / 2 - 0.3, y: 4.4, w: 0.6, h: 0,
    line: { color: C.accent, width: 2 },
  });

  slide.addText("Conversemos", {
    x: 0.6, y: 4.55, w: W - 1.2, h: 0.4,
    fontFace: FONT.body, fontSize: 14, bold: true,
    color: C.accent, align: "center", charSpacing: 2, margin: 0,
  });
  slide.addText("hola@deskhub.example.com · deskhub.example.com", {
    x: 0.6, y: 4.85, w: W - 1.2, h: 0.4,
    fontFace: FONT.mono, fontSize: 11,
    color: C.primarySoft, align: "center", margin: 0,
  });

  slide.addText("FABRIC LAB · Master Presentation v1.2.1", {
    x: 0.6, y: H - 0.35, w: W - 1.2, h: 0.25,
    fontFace: FONT.body, fontSize: 9, bold: true,
    color: C.primarySoft, charSpacing: 2, align: "center", margin: 0,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("→ Preloading icons…");
  await preloadIcons();
  console.log("✓ Icons rendered");

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "DeskHUB / Fabric Lab";
  pres.company = "Fabric Lab";
  pres.title = "DeskHUB — Ecosistema de Trabajo Empresarial e Institucional";
  pres.subject = "Master Presentation v1.2.1";

  // Build all 24 slides
  slide01Cover(pres);
  slide02Context(pres);
  slide03Problem(pres);
  slide04Cost(pres);
  slide05Change(pres);
  slide06WhatIs(pres);
  slide07Architecture(pres);
  slide08DeskWork(pres);
  slide09Station(pres);
  slide10DeskNow(pres);
  slide11Taxonomy(pres);
  slide12DeskBrain(pres);
  slide13DeskThing(pres);
  slide14DesksIA(pres);
  slide15Together(pres);
  slide16Integration(pres);
  slide17Journey1(pres);
  slide18Journey2(pres);
  slide19Verticals(pres);
  slide20Services(pres);
  slide21Offer(pres);
  slide22Evolution(pres);
  slide23Vision(pres);
  slide24Closing(pres);

  const outPath = path.join(
    __dirname, "..", "presentations",
    "DESKHUB_MASTER_PRESENTATION_v1.2.1.pptx"
  );
  await pres.writeFile({ fileName: outPath });
  console.log("✓ Wrote", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});