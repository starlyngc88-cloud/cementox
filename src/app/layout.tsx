import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getConfig } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cementox",
  description: "Estimación de asentamiento de cemento a partir de foto o video.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { theme } = getConfig();
  const variables = Object.entries(theme.colors)
    .map(([key, value]) => `--${key.replace(".", "-")}: ${value};`)
    .join(" ");

  return (
    <html lang="es">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root { ${variables} }` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}