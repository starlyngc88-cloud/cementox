import { readFileSync } from "node:fs";
import path from "node:path";
import type { z } from "zod";
import {
  mediaConfigSchema,
  measurementConfigSchema,
  themeConfigSchema,
  type MediaConfig,
  type MeasurementConfig,
  type ThemeConfig,
} from "@shared/index";

function loadJson<T>(fileName: string, schema: z.ZodType<T>): T {
  const filePath = path.join(process.cwd(), "config", fileName);
  const raw = readFileSync(filePath, "utf-8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`Config inválida: ${fileName} no es JSON válido.`);
  }
  const result = schema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Config inválida en ${fileName}: ${result.error.message}`);
  }
  return result.data;
}

let cache: { media: MediaConfig; measurement: MeasurementConfig; theme: ThemeConfig } | null =
  null;

export function getConfig() {
  if (!cache) {
    cache = {
      media: loadJson("media.json", mediaConfigSchema),
      measurement: loadJson("measurement.json", measurementConfigSchema),
      theme: loadJson("theme.json", themeConfigSchema),
    };
  }
  return cache;
}