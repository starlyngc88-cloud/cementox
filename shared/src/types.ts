import type { MediaConfig, MeasurementConfig } from "./config-schema";

export type ColorToken = "success" | "warning" | "error" | "info" | "neutral";

export type MediaKind = "image" | "video";

export type AnalysisStatus = "uploading" | "analyzing" | "completed" | "warning" | "error";

export type EvidenceReason =
  | "low_resolution"
  | "low_sharpness"
  | "poor_lighting"
  | "reference_missing"
  | "processing_failed";

export interface EvidenceIssue {
  reason: EvidenceReason;
  message: string;
}

export interface AnalysisResult {
  status: Exclude<AnalysisStatus, "uploading" | "analyzing">;
  color: ColorToken;
  estimatedValue: number | null;
  unit: MeasurementConfig["outputUnit"] | null;
  confidence: number | null;
  consistencyLabel: string | null;
  preliminary: boolean;
  message: string;
  issues: EvidenceIssue[];
  formula?: string;
  formulaBasis?: string;
  requiredAngles?: string[];
}

export interface AnalyzedFile {
  name: string;
  kind: MediaKind;
  sizeBytes: number;
  previewUrl: string;
}

export interface AnalyzeResponse {
  result: AnalysisResult;
}

export type { MediaConfig, MeasurementConfig };