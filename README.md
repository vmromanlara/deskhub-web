# DeskHUB Web

Sitio corporativo de **DeskHUB** + producto **DeskWork** + demo navegable.

Esta es la **Fase 1**: base técnica limpia, compilable y preparada para crecer.
Aún **no** está conectado a Supabase, ni incluye autenticación real, ni backend.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4 (tokens DeskWork Brand Book v1.0)
- Lucide React (iconos)
- ESLint (config Next.js)
- pnpm

## Rutas

| Ruta | Propósito |
|------|-----------|
| `/` | Landing institucional DeskHUB |
| `/deskwork` | Producto DeskWork (capacidades, vistas, arquitectura) |
| `/demo` | Demo navegable con mock data (Home → Tickets → Detail → Crear solicitud → Confirmación) |
| `/contacto` | Formulario UI con validación local |

## Identidad visual

Tokens DeskWork Brand Book v1.0:

- **Primary**: `#0d4f4a` (Teal) · `#0a3d39` (Deep) · `#d9eae7` (Soft)
- **Accent**: `#6ee7df` (Mint)
- **Canvas**: `#fafaf7` · **Surface**: `#ffffff` · **Line**: `#e9e3d6`
- **Ink**: `#14171e` · **Secondary**: `#3a4256` · **Muted**: `#7c7a72`
- **Prioridades**: P1 `#b3331f` · P2 `#c2410c` · P3 `#a16207` · P4 `#047857`
- **Tipografía**: Outfit (sans) + JetBrains Mono (mono)
- **Espaciado**: escala 4 px
- Iconos: Lucide, stroke 2 px, 24 px

## Comandos

```bash
pnpm install
pnpm dev          # desarrollo
pnpm build        # build de producción
pnpm start        # arrancar build
pnpm lint         # ESLint
```

## Estructura

```
app/
├── page.tsx                    # landing DeskHUB
├── deskwork/page.tsx           # producto
├── demo/page.tsx               # demo navegable (cliente)
├── contacto/page.tsx           # formulario UI
├── layout.tsx                  # root layout + fonts + metadata
├── globals.css                 # tokens DeskWork
└── icon.svg                    # favicon

components/
├── layout/                     # Container, Header, Footer, Logo
├── marketing/                  # Hero, Problem, DeskWorkIntro, Ecosystem, Audience, Differentiators, Cta, ContactForm
├── product/                    # Purpose, Capabilities, Views, Architecture, Sectors, Cta
└── demo/                       # DemoShell (state machine) + 5 pantallas + mockData

public/
├── brand/
├── images/
└── product/

lib/
├── site.ts                     # configuración del sitio (metadata)
├── nav.ts                      # navegación principal
└── cn.ts                       # classnames helper
```

## Próximos pasos

- **Fase 2**: construir las secciones visuales completas del sitio corporativo (hero animado, casos de uso, sectores).
- **Fase 3**: mejorar la demo con datos dinámicos y más pantallas (dashboards, búsqueda, conocimiento).
- **Fase 4**: conectar Supabase para `/app` (autenticación real, multi-tenant, RLS).