import { z } from "zod";
import type { MediaKind } from "./types";

export interface UploadLimits {
  allowedImageTypes: string[];
  allowedVideoTypes: string[];
  maxImageBytes: number;
  maxVideoBytes: number;
}

const uploadSchema = z.object({
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().nonnegative(),
});

export interface UploadCheck {
  ok: boolean;
  kind: MediaKind | null;
  errors: string[];
}

export function resolveKind(mimeType: string, limits: UploadLimits): MediaKind | null {
  if (limits.allowedImageTypes.includes(mimeType)) return "image";
  if (limits.allowedVideoTypes.includes(mimeType)) return "video";
  return null;
}

export function checkUpload(
  mimeType: string,
  sizeBytes: number,
  limits: UploadLimits,
): UploadCheck {
  const parsed = uploadSchema.safeParse({ mimeType, sizeBytes });
  if (!parsed.success) {
    return { ok: false, kind: null, errors: parsed.error.issues.map((i) => i.message) };
  }

  const kind = resolveKind(mimeType, limits);
  if (!kind) {
    const allowed = [...limits.allowedImageTypes, ...limits.allowedVideoTypes].join(", ");
    return { ok: false, kind: null, errors: [`Formato no permitido (${mimeType}). Permitidos: ${allowed}.`] };
  }

  const limit = kind === "image" ? limits.maxImageBytes : limits.maxVideoBytes;
  if (sizeBytes > limit) {
    return { ok: false, kind, errors: [`El archivo supera el peso máximo de ${limit} bytes.`] };
  }

  return { ok: true, kind, errors: [] };
}