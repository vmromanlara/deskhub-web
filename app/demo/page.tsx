import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata: Metadata = buildMetadata({
  path: "/demo",
  title: "Demo",
  description: "Recorre DeskWork en cinco pantallas con datos ficticios: inicio, tickets, detalle, crear solicitud y confirmación. Sin registro, sin instalación.",
});
export default function DemoPage() {
  return <DemoShell />;
}