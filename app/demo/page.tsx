import type { Metadata } from "next";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata: Metadata = {
  title: "Demo — DeskWork",
  description:
    "Recorre DeskWork en cinco pantallas con datos ficticios: inicio, tickets, detalle, crear solicitud y confirmación. Sin registro, sin instalación.",
  openGraph: {
    title: "Demo — DeskWork",
    description:
      "Recorre DeskWork en cinco pantallas con datos ficticios.",
  },
};

export default function DemoPage() {
  return <DemoShell />;
}