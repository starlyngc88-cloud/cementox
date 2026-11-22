import { z } from "zod";

const colorToken = z.enum(["success", "warning", "error", "info", "neutral"]);

const statusEntry = z.object({
  label: z.string().min(1),
  color: colorToken,
});

export const mediaConfigSchema = z.object({
  allowedImageTypes: z.array(z.string().min(1)).min(1),
  allowedVideoTypes: z.array(z.string().min(1)).min(1),
  maxImageBytes: z.number().int().positive(),
  maxVideoBytes: z.number().int().positive(),
  maxVideoSeconds: z.number().int().positive(),
  statuses: z.object({
    uploading: statusEntry,
    analyzing: statusEntry,
    completed: statusEntry,
    warning: statusEntry,
    error: statusEntry,
  }),
  progress: z.object({
    uploadingMs: z.number().int().nonnegative(),
    analyzingMs: z.number().int().nonnegative(),
  }),
});

export const measurementConfigSchema = z.object({
  testType: z.enum(["slump_cone", "spread", "vertical_drop", "custom"]),
  baseUnit: z.enum(["cm", "mm", "in"]),
  outputUnit: z.enum(["cm", "mm", "in"]),
  conversions: z.object({
    cm: z.number().positive(),
    mm: z.number().positive(),
    in: z.number().positive(),
  }),
  calibration: z.object({
    enabled: z.boolean(),
    referenceType: z.enum(["known_object", "marker", "cone_proportion"]),
    baseDimension: z.number().positive(),
  }),
  consistencyRanges: z
    .array(
      z.object({
        id: z.string().min(1),
        label: z.string().min(1),
        min: z.number(),
        max: z.number(),
        color: colorToken,
      }),
    )
    .min(1),
  confidenceThresholds: z.object({
    success: z.number().min(0).max(100),
    warning: z.number().min(0).max(100),
    error: z.number().min(0).max(100),
  }),
  evidenceMinimums: z.object({
    minWidthPx: z.number().int().positive(),
    minHeightPx: z.number().int().positive(),
    minSharpness: z.number().min(0).max(100),
    minBrightness: z.number().min(0).max(100),
    maxBrightness: z.number().min(0).max(100),
    requireReferenceVisible: z.boolean(),
  }),
  messages: z.object({
    preliminary: z.string().min(1),
    notConclusive: z.string().min(1),
    notConcrete: z.string().min(1),
    reasons: z.object({
      low_resolution: z.string().min(1),
      low_sharpness: z.string().min(1),
      poor_lighting: z.string().min(1),
      reference_missing: z.string().min(1),
      processing_failed: z.string().min(1),
    }),
  }),
});

export const themeConfigSchema = z.object({
  colors: z.record(z.string(), z.string().regex(/^#[0-9A-Fa-f]{6}$/)),
});

export type MediaConfig = z.infer<typeof mediaConfigSchema>;
export type MeasurementConfig = z.infer<typeof measurementConfigSchema>;
export type ThemeConfig = z.infer<typeof themeConfigSchema>;