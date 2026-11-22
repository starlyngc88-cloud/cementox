import type { AnalysisResult, AnalyzeResponse } from "@shared/index";

export async function requestAnalysis(file: File, fallbackErrorLabel: string): Promise<AnalysisResult> {
  const form = new FormData();
  form.append("file", file);

  const response = await fetch("/api/analyze", { method: "POST", body: form });
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    const issues = [
      {
        reason: "processing_failed" as const,
        message: payload?.error ?? fallbackErrorLabel,
      },
    ];
    return {
      status: "error",
      color: "error",
      estimatedValue: null,
      unit: null,
      confidence: null,
      consistencyLabel: null,
      preliminary: false,
      message: fallbackErrorLabel,
      issues,
    };
  }

  const payload = (await response.json()) as AnalyzeResponse;
  return payload.result;
}