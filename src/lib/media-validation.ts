import { getConfig } from "@/lib/config";
import { checkUpload, type MediaKind, type UploadCheck } from "@shared/index";

export interface ValidationResult extends UploadCheck {
  kind: MediaKind | null;
}

export function validateUpload(mimeType: string, sizeBytes: number): ValidationResult {
  const { media } = getConfig();
  return checkUpload(mimeType, sizeBytes, {
    allowedImageTypes: media.allowedImageTypes,
    allowedVideoTypes: media.allowedVideoTypes,
    maxImageBytes: media.maxImageBytes,
    maxVideoBytes: media.maxVideoBytes,
  });
}